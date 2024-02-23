import { memo } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LazyCardMedia from "./LazyCardMedia";

const ImageCarousel = memo(({ images }: { images: string[] }) => {
  return (
    <Carousel showArrows showIndicators showThumbs={false}>
      {images.map((image) => (
        <CardMediaItem key={image} image={image} />
      ))}
    </Carousel>
  );
});

const CardMediaItem = memo(({ image }: { image: string }) => {
  return <LazyCardMedia image={image} />;
});

export default ImageCarousel;
