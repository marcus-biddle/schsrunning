import React, { useRef, TouchEvent } from 'react';
import { IoArrowForwardSharp } from 'react-icons/io5'
import './styled.css';
import { Link } from 'react-router-dom';

interface MobileSliderProps {
  items: { [key: string]: any[] };
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
        {Object.keys(items).map((date: string) => (
        <div key={date} className="slider-item">
          <div style={{ }}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <h5 style={{ color: 'grey', fontFamily: "'Lato', sans-serif", fontWeight: 'lighter', fontSize: '14px' }}>{date}</h5>
              <Link to={''} >
                <IoArrowForwardSharp style={{ height: '20px', width: '20px', color: 'white'}}/>
              </Link>
              
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline'}}>
              <h1>{items[date][0].raceName}</h1>
            </div>
            
          </div>
          
          <h5 style={{ color: 'grey', fontFamily: "'Lato', sans-serif", fontWeight: 'lighter', fontSize: '16px', padding: '6px' }}>Top Runners | {items[date][0].courseDistance} miles</h5>
          <ul>
            {items[date].map((item) => (
              <li key={item.competitorId} style={{ listStyle: 'none', padding: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {item.firstName} {item.lastName}
                </div>
                <div>
                  {item.time}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
        {/* {items.map((item, index) => (
          <div className="slider-item" key={index}>
            {item}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default MobileSlider;

