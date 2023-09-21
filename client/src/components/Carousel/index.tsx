import React, { useState, useEffect } from 'react';
import './styled/index.css';
import { Images } from '../../assets';
import { Link } from 'react-router-dom';

interface ImageCarouselProps {
  images: Images[];
  interval?: number;
}

const getrandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, interval }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(getrandomNumber(27)); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images.length, interval]);

  return (
    <div style={{ position: 'relative'}}>
      <Link to={'/b'} className='image-drape'>
        View All
      </Link>
      <div className="image-carousel">
        {images.map((image, index) => (
          <img
            key={index}
            className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
            src={image.img}
            alt={`Image ${index + 1}`}
          />
        ))}
      </div>
    </div>
    
  );
};

export default ImageCarousel;

