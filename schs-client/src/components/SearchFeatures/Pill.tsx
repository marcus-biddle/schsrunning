import './index.css';

interface PillProps {
    handleButtonClick: (option: string) => void;
    activeButton: string;
}

export const Pill = ({ handleButtonClick, activeButton}: PillProps) => {
  return (
    <div className='pill'>
        <div className='pill-container'>
            <div style={{ position: 'absolute', height: '100%', width: '100%', display: 'flex', flexDirection: 'row'}}>
                <button
                    className={`toggle-button ${activeButton === 'men' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('men')}
                    style={{ borderRight: '1.5px solid'}}
                >
                    Men
                </button>
                <button
                    className={`toggle-button ${activeButton === 'women' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('women')}
                >
                    Women
                </button>
            </div> 
        </div>
    </div>
    
  )
}