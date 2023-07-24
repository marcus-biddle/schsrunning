import React, { useRef, TouchEvent } from 'react';
import './styled.css';

interface MobileSliderProps {
  items: string[];
}

const MobileSlider: React.FC<MobileSliderProps> = ({ items }) => {
  const sliderContentRef = useRef<HTMLDivElement>(null);
  let startX = 0;
  let isDragging = false;

  const handleTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;

    const diffX = e.touches[0].clientX - startX;
    if (sliderContentRef.current) {
      sliderContentRef.current.scrollLeft -= diffX;
    }
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    isDragging = false;
  };

  return (
    <div className="slider-container">
      <div
        className="slider-content"
        ref={sliderContentRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <div className="slider-item" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSlider;

