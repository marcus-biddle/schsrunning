import React from 'react';
import './styled.css';

const MobileGrid = ({ items }: { items: string[]}) => {
  const numRows = Math.ceil(items.length / 2);

  return (
    <div className="mobile-grid">
      {Array.from({ length: numRows }, (_, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {items.slice(rowIndex * 2, rowIndex * 2 + 2).map((item, colIndex) => (
            <div className="grid-item" key={colIndex}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MobileGrid;
