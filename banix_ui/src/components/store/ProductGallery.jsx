import React from "react";
import ImageGallery from "react-image-gallery";

const ProductGallery = ({ productMedia }) => {
  console.log(
    "[ProductGallery] The media items recieved are :: ",
    productMedia
  );
  const items = [];
  const mediaRenderer = (item) => {
    console.log("mediaRenderer", item);
    return (
      <video
        id="vid"
        autoPlay
        loop
        muted
        width="100%"
        height="100%"
        controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
        poster={item.thumbnail}
        onClick={() => {}}
      >
        <source src={item.original} type="video/mp4" />
      </video>
    );
  };
  productMedia.map((item, idx) => {
    if (item.mediaType === "image") {
      items.push({
        type: item.mediaType,
        text: item.mediaText,
        original: `/media/images/carousel/${item.mediaId}`,
        thumbnail: `/media/images/card/${item.mediaId}`,
      });
    } else if (item.mediaType === "video") {
      items.push({
        type: item.mediaType,
        original: `/media/videos/low/${item.mediaId}`,
        thumbnail: `/media/videos/poster/${item.mediaPoster}`,
        renderItem: mediaRenderer,
      });
    }
  });
  //   const videoRender =  === "v" ? videoRenderer : null;

  return (
    <ImageGallery
      items={items}
      showPlayButton={false}
      slideInterval={3000}
      showNav={true}
      startIndex={0}
      showThumbnails={true}
      thumbnailPosition="bottom"
      showFullscreenButton={true}
      showIndex={true}
    />
  );
};

export default ProductGallery;
