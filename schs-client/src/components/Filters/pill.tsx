import React from 'react';
import './styled.css';

const SportFilter = () => {
  return (
    <div style={{ height: '48px', display: 'flex', alignContent: 'left'}}>
        <div className='pill-filter'>
            Track
        </div>
        <div className='pill-filter'>
            Cross Country
        </div>
        <div className='pill-filter'>
            Coaches
        </div>
    </div>
  )
}

export default SportFilter