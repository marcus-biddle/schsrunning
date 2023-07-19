import React from 'react'
import { GenericButton } from '../Button'

const Filters = () => {
  return (
    <div style={{ marginTop: '1rem', marginBottom: '-8rem'}}>
        <div style={{ height: '2rem', position: 'relative'}}>
            <GenericButton type='button' label="All Time" />
        </div>
        <div style={{ height: '2rem', position: 'relative', left: '6rem', bottom: '2rem'}}>
            <GenericButton type='button' label="Senior" />
        </div>
        <div style={{ height: '2rem', position: 'relative', left: '11.5rem', bottom: '4rem'}}>
            <GenericButton type='button' label="Junior" />
        </div>
        <div style={{ height: '2rem', position: 'relative', left: '16.8rem', bottom: '6rem'}}>
            <GenericButton type='button' label="Sophomore" />
        </div>
        <div style={{ height: '2rem', position: 'relative', left: '24.25rem', bottom: '8rem'}}>
            <GenericButton type='button' label="Freshman" />
        </div>
    </div>
    
  )
}

export default Filters