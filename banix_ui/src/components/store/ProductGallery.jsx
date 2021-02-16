import React from "react";
import ImageGallery from "react-image-gallery";
import ReactPlayer from "react-player";

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
    // return <ReactPlayer url={item.original} />;
  };
  productMedia.map((item, idx) => {
    if (item.mediaType === "image") {
      items.push({
        type: item.mediaType,
        text: item.mediaText,
        original: `${process.env.REACT_APP_SERVER_URL}/media/images/carousel/${item.mediaId}`,
        thumbnail: `${process.env.REACT_APP_SERVER_URL}/media/images/card/${item.mediaId}`,
      });
    } else if (item.mediaType === "video") {
      items.push({
        type: item.mediaType,
        original: `${process.env.REACT_APP_SERVER_URL}/media/videos/low/${item.mediaId}`,
        thumbnail: `${process.env.REACT_APP_SERVER_URL}/media/videos/poster/${item.mediaPoster}`,
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
