import React, { useState, useEffect } from 'react';
import './styled/index.css';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, interval }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images.length, interval]);

  return (
    <div className="image-carousel">
      {images.map((image, index) => (
        <img
          key={index}
          className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
          src={image}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;

