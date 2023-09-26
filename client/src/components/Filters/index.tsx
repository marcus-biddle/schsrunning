
import { useEffect, useState } from 'react';
import { GenericButton } from '../Button'

interface FilterProps {
    handleClick: (option: number) => void;
}

export const Filters = ({ handleClick }: FilterProps) => {
    const [active, setActive] = useState(0);

    const handleFilter = (option: number) => {
        setActive(option === active ? 0 : option);
    };

    useEffect(() => {
        handleClick(active);
      }, [active]);
      

  return (
    <div style={{ marginTop: '1rem', marginBottom: '1rem', height: '2rem'}}>
        <GenericButton type='button' label="Senior" pos='static' color={active === 12 ? '#1f6eb0' : '#1f6fb05b'} onClick={() => handleFilter(12)}/>
        <GenericButton type='button' label="Junior" pos='static' color={active === 11 ? '#1f6eb0' : '#1f6fb05b'} onClick={() => handleFilter(11)}/>
        <GenericButton type='button' label="Sophomore" pos='static' color={active === 10 ? '#1f6eb0' : '#1f6fb05b'} onClick={() => handleFilter(10)}/>
        <GenericButton type='button' label="Freshmen" pos='static' color={active === 9 ? '#1f6eb0' : '#1f6fb05b'} onClick={() => handleFilter(9)}/>
    </div>
    
  )
}