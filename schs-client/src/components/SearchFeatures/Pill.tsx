import './index.css';

interface PillProps {
    handleButtonClick: (option: string) => void;
    activeButton: string;
}

export const Pill = ({ handleButtonClick, activeButton}: PillProps) => {
  return (
    <div style={{ borderRadius: '8px', width: '10rem', height: '33px', position: 'relative', overflow: 'hidden'}}>
        <div style={{ position: 'absolute', height: '100%', width: '100%', display: 'flex'}}>
            <button
                className={`toggle-button ${activeButton === 'men' ? 'active' : ''}`}
                onClick={() => handleButtonClick('men')}
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
  )
}