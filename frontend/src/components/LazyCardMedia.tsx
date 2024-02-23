import CardMedia from "@mui/material/CardMedia";
import React, { useState, useRef, useEffect } from "react";

interface LazyImageProps {
  image: string;
  height?: number | string;
}

const LazyCardMedia: React.FC<LazyImageProps> = ({ image, height }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <CardMedia
      component="img"
      height={height || "300"}
      width="500"
      ref={imageRef}
      image={isVisible ? image : ""}
    />
  );
};

export default LazyCardMedia;
