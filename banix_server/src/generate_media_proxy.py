from multiprocessing import Pool
import mimetypes
import os
import re
import shlex
import shutil
import subprocess as sp
import sys
import time
import uuid
from src.models import ProductMedia, ProductCarouselMedia, Product
from src.db_utils import Session

media_source_path = "/home/arun/assets/media/raw"
media_processed_path = "/home/arun/assets/media/processed"
media_image_proxy_path = "/home/arun/assets/media/images"
media_video_proxy_path = "/home/arun/assets/media/videos"

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
    print(f"[check_valid_product] The product information retrieved is :: {product_info}")
    return product_info


def add_to_folders_to_remove(product):
    if product not in FOLDERS_TO_REMOVE:
        FOLDERS_TO_REMOVE[product] = 1
    else:
        FOLDERS_TO_REMOVE[product] += 1
    pass

def generate_image_proxy(media_id, src_path, profile):
    dst_path = os.path.join(media_image_proxy_path, profile["profile"], media_id)
    if not os.path.exists(os.path.dirname(dst_path)):
        os.makedirs(os.path.dirname(dst_path))
    width = profile["resolution"].split("x")[0]
    cmd = f"ffmpeg -y -i {src_path} -vf scale={width}:-1 {dst_path}"
    print(f"[generate_image_proxy] The command prepared is : [{cmd}] ")
    res = sp.call(shlex.split(cmd))
    print(f"[generate_image_proxy] The result is :{res}")
    return None

def generate_video_proxy(media_id, src_path, profile):
    dst_path = os.path.join(media_video_proxy_path, profile["profile"], media_id)
    if not os.path.exists(os.path.dirname(dst_path)):
        os.makedirs(os.path.dirname(dst_path))
    width = profile["resolution"].split("x")[0]
    cmd = f"ffmpeg -y -i {src_path} -vf scale={width}:-2,setsar=1:1 -c:v libx264 -c:a copy {dst_path}"
    print(f"[generate_video_proxy] The command prepared is : [{cmd}] ")
    res = sp.call(shlex.split(cmd))
    print(f"[generate_video_proxy] The result is :{res}")
    return


if __name__ == "__main__":
    while True:
        try:
            raw_media_folders = os.listdir(media_source_path)
            for product in raw_media_folders:
                product_id = product.split("prod_", 1)[-1]
                print(f"Processing the folder {product}: {product_id}")
                if product_info := check_valid_product(product_id):
                    print(f"processing the product : {product_info}")
                    media = os.listdir(os.path.join(media_source_path, product))
                    if not media:
                        add_to_folders_to_remove(product_id)
                        break
                    product_media = ProductMedia(products=product_info)
                    for item in media:
                        media_id = str(uuid.uuid4())+"__"+str(item)
                        src_path = os.path.join(os.path.join(media_source_path, product, item))
                        mime_type = mime.guess_type(item)
                        print(f"{item} has mime type {mime_type}")
                        if mime_type and mime_type[0].startswith("image"):
                            if "__primary__" in item:
                                product_media.primary_image_id = media_id
                            for profile in IMAGE_PROFILES:
                                generate_image_proxy(media_id=media_id,
                                                     src_path=src_path,
                                                     profile=profile)
                            ProductCarouselMedia(product_media=product_media, media_id=media_id, media_type="image")
                        elif mime_type and mime_type[0].startswith("video"):
                            if "__primary__" in item:
                                product_media.primary_video_id = media_id
                            for profile in VIDEO_PROFILES:
                                generate_video_proxy(media_id=media_id,
                                                     src_path=src_path,
                                                     profile=profile)
                            ProductCarouselMedia(product_media=product_media, media_id=media_id, media_type="video")
                    sess.add(product_media)
                    sess.commit()
                    print(f"Product Media : {product_media}")
                    shutil.move(src=os.path.join(media_source_path, product),
                                dst=os.path.join(media_processed_path))
                else:
                    print(f"Invalid Product id : {product_id}")
                    add_to_folders_to_remove(product)

            for folder_to_remove in FOLDERS_TO_REMOVE:
                if FOLDERS_TO_REMOVE[folder_to_remove] > 3:
                    print(f"Removing the folder : {folder_to_remove}")
                    shutil.rmtree(os.path.join(media_source_path, folder_to_remove))
        except Exception as ex:
            print(f"Exception while walking for proxy : {ex}")
        time.sleep(60)
