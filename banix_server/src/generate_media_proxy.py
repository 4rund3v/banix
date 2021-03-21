from multiprocessing import Pool

import mimetypes
import os
import shlex
import shutil
import subprocess as sp
import sys
import time
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from configuration import MEDIA_SOURCE_PATH, MEDIA_PROCESSED_PATH, MEDIA_IMAGE_PROXY_PATH, MEDIA_VIDEO_PROXY_PATH
from src.models import ProductMedia, ProductCarouselMedia, Product
from src.db_utils import Session
from src.logger import get_logger
logger = get_logger("proxy")

mime = mimetypes.MimeTypes()

IMAGE_PROFILES = [
    {
        "profile": "carousel",
        "resolution": "450x400"
    },
    {
        "profile": "cart",
        "resolution": "300x300"
    },
    {
        "profile": "details",
        "resolution": "720x586"
    },
    {
        "profile": "card",
        "resolution": "220x220"
    },
    {
        "profile": "search",
        "resolution": "45x30"
    }]

VIDEO_PROFILES = [
    {
        "profile": "low",
        "resolution": "320x240"
    },
    {
        "profile": "medium",
        "resolution": "480x360"
    },
    {
        "profile": "high",
        "resolution": "852x480"
    }
]

# Global Data
sess = Session()
FOLDERS_TO_REMOVE = {}

def check_valid_product(product_id):
    product_info = sess.query(Product).filter(Product.product_id == product_id).first()
    logger.debug(f"[check_valid_product] The product information retrieved is :: {product_info}")
    return product_info


def add_to_folders_to_remove(product):
    if product not in FOLDERS_TO_REMOVE:
        FOLDERS_TO_REMOVE[product] = 1
    else:
        FOLDERS_TO_REMOVE[product] += 1
    pass

def generate_image_proxy(media_id, src_path, profile):
    dst_path = os.path.join(MEDIA_IMAGE_PROXY_PATH, profile["profile"], media_id)
    if not os.path.exists(os.path.dirname(dst_path)):
        os.makedirs(os.path.dirname(dst_path))
    width, height = profile["resolution"].split("x")
    cmd = f"ffmpeg -y -i {src_path} -vf scale={width}:{height} {dst_path}"
    logger.debug(f"[generate_image_proxy] The command prepared is : [{cmd}] ")
    res = sp.call(shlex.split(cmd))
    logger.debug(f"[generate_image_proxy] The result is :{res}")
    return None

def generate_video_proxy(media_id, src_path, profile):
    dst_path = os.path.join(MEDIA_VIDEO_PROXY_PATH, profile["profile"], media_id)
    if not os.path.exists(os.path.dirname(dst_path)):
        os.makedirs(os.path.dirname(dst_path))
    width = profile["resolution"].split("x")[0]
    cmd = f"ffmpeg -y -i {src_path} -vf scale={width}:-2,setsar=1:1 -c:v libx264 -c:a copy {dst_path}"
    logger.debug(f"[generate_video_proxy] The command prepared is : [{cmd}] ")
    res = sp.call(shlex.split(cmd))
    logger.debug(f"[generate_video_proxy] The result is :{res}")
    return


def generate_video_poster(media_id, poster_id, src_path):
    dst_path = os.path.join(MEDIA_VIDEO_PROXY_PATH, "poster", poster_id)
    if not os.path.exists(os.path.dirname(dst_path)):
        os.makedirs(os.path.dirname(dst_path))
    width = 480
    cmd = f"ffmpeg -y -i {src_path} -deinterlace -an -ss 00:00:35 -f mjpeg -t 1 -r 1 {dst_path}"
    logger.debug(f"[generate_video_poster] The command prepared is : [{cmd}] ")
    res = sp.call(shlex.split(cmd))
    logger.debug(f"[generate_video_poster] The result is :{res}")
    return


if __name__ == "__main__":
    while True:
        if not os.path.exists(MEDIA_SOURCE_PATH):
            logger.debug(f" The media source folder does not exist :: {MEDIA_SOURCE_PATH}")
            time.sleep(20)
            continue
        raw_media_folders = os.listdir(MEDIA_SOURCE_PATH)
        for product in raw_media_folders:
            try:
                product_id = product.split("prod_", 1)[-1]
                logger.debug(f"[main] Processing the folder {product}: {product_id}")
                product_info = check_valid_product(product_id)
                if product_info:
                    logger.debug(f"processing the product : {product_info}")
                    media = os.listdir(os.path.join(MEDIA_SOURCE_PATH, product))
                    if not media:
                        add_to_folders_to_remove(product_id)
                        break
                    product_media = ProductMedia(products=product_info)
                    for idx, item in enumerate(media):
                        media_id = str(product_id)+"__"+str(item)
                        src_path = os.path.join(os.path.join(MEDIA_SOURCE_PATH, product, item))
                        mime_type = mime.guess_type(item)
                        logger.debug(f"[main] {item} has mime type {mime_type}")
                        if mime_type and mime_type[0].startswith("image"):
                            if "__primary__" in item:
                                product_media.primary_image_id = media_id
                            for profile in IMAGE_PROFILES:
                                generate_image_proxy(media_id=media_id,
                                                     src_path=src_path,
                                                     profile=profile)
                            ProductCarouselMedia(product_media=product_media,
                                                 media_id=media_id,
                                                 media_position=idx,
                                                 media_type="image")
                        elif mime_type and mime_type[0].startswith("video"):
                            if "__primary__" in item:
                                product_media.primary_video_id = media_id
                            for profile in VIDEO_PROFILES:
                                generate_video_proxy(media_id=media_id,
                                                     src_path=src_path,
                                                     profile=profile)
                            poster_id = media_id+"__.jpg"
                            generate_video_poster(media_id=media_id, poster_id=poster_id, src_path=src_path)
                            ProductCarouselMedia(product_media=product_media,
                                                 media_id=media_id,
                                                 poster_id=poster_id,
                                                 media_position=idx,
                                                 media_type="video")
                    sess.add(product_media)
                    sess.commit()
                    logger.debug(f"Product Media : {product_media}")
                    shutil.move(src=os.path.join(MEDIA_SOURCE_PATH, product),
                                dst=os.path.join(MEDIA_PROCESSED_PATH))
                else:
                    logger.debug(f"Invalid Product id : {product_id}")
                    add_to_folders_to_remove(product)
            except Exception as ex:
                logger.exception(f"Exception while walking for proxy : {ex}")
        for folder_to_remove in FOLDERS_TO_REMOVE:
            if FOLDERS_TO_REMOVE[folder_to_remove] > 3:
                logger.debug(f"Removing the folder : {folder_to_remove}")
                shutil.rmtree(os.path.join(MEDIA_SOURCE_PATH, folder_to_remove))
        time.sleep(60)
