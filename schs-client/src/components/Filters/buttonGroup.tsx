import React, { useState } from 'react';
import './styled.css';

const MobileButtonGroup = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const buttons = ['Cross Country', 'Track', ];

  const handleButtonClick = (index: number | null) => {
    setSelectedButton(selectedButton === index ? null : index);
  };

  return (
    <div className="button-group">
      { buttons.map((button, index) => (
          <button key={index} 
          onClick={() => handleButtonClick(index)}
          className={`selected-button ${selectedButton !== null ? selectedButton === index ? 'selected': 'inactive' : ''}`}>
            {button}
          </button>
        ))
      }
    </div>
  );
};

export default MobileButtonGroup;

