import { useState } from 'react'
import { GenericButton } from '../Button'

interface FilterProps {
    onClick: (option: string) => void;
}

const Filters = ({ onClick }: FilterProps) => {
    const [active, setActive] = useState('');

    const handleClick = (option: string): void => {
        if (active === option) {
            setActive('');
        } else {
            setActive(option);
        }
        console.log('filter', option)
        onClick(active);
    };

  return (
    <div style={{ marginTop: '1rem', display: 'flex', width: '100%'}}>
        <div >
            <GenericButton type='button' label="All Time" pos='static' color={active === 'All Time' ? '#CCCCCC' : 'black'} onClick={() => handleClick('All Time')} />
        </div>
        <div >
            <GenericButton type='button' label="Senior" pos='static' color={active === 'All Time' ? '#CCCCCC' : 'black'} onClick={() => handleClick('Senior')}/>
        </div>
        <div>
            <GenericButton type='button' label="Junior" pos='static' color={active === 'All Time' ? '#CCCCCC' : 'black'} onClick={() => handleClick('Junior')}/>
        </div>
        <div>
            <GenericButton type='button' label="Sophomore" pos='static' color={active === 'All Time' ? '#CCCCCC' : 'black'} onClick={() => handleClick('Sophomore')}/>
        </div>
        <div>
            <GenericButton type='button' label="Freshmen" pos='static' color={active === 'All Time' ? '#CCCCCC' : 'black'} onClick={() => handleClick('Freshmen')}/>
        </div>
    </div>
    
  )
}

export default Filters