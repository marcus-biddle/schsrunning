import React, { useState } from 'react'
import { useLocation } from 'react-router';
import { urlContains } from '../../../helpers';
import { Link } from 'react-router-dom';

const eventData = [
    { 
        event: 'Sprints',
        types: [
            { name: '100m Dash', path: ''},
            { name: '200m Dash', path: ''},
            { name: '400m Dash', path: ''}
        ]
    },
    { 
        event: 'Distance',
        types: [
            { name: '800m Run', path: ''},
            { name: '1600m Run', path: ''},
            { name: '3200m Run', path: ''}
        ]
    },
    { 
        event: 'Hurdles',
        types: [
            { name: '65m Hurdles', path: ''},
            { name: '110m Hurdles', path: ''},
            { name: '300m Hurdles', path: ''}
        ]
    },
    { 
        event: 'Relays',
        types: [
            { name: '400m Relays', path: ''},
            { name: '1600m Relays', path: ''},
        ]
    },
    { 
        event: 'Jumps',
        types: [
            { name: 'High Jump', path: ''},
            { name: 'Long Jump', path: ''},
            { name: 'Triple Jump', path: ''},
            { name: 'Pole Vault', path: ''},
        ]
    },
    { 
        event: 'Throws',
        types: [
            { name: 'Shot Put', path: ''},
            { name: 'Discuss', path: ''},
        ]
    },
]

export const ResultListPage = () => {
    const location = useLocation();
    const pageType = urlContains(location.pathname, ['event', 'hall-of-fame']);
    const [filter, setFilter] = useState('');

    const handleEventFilter = (value: string) => {
        setFilter(value === filter ? '' : value);
    }

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem', minHeight: '100vh'}}>
        <div style={{ width: '100%', borderBottom: '1px solid grey'}}>
            <h2>SCHS Track & Field Events</h2>
            <p>Insert breadcrumb</p>
        </div>
        
        {/* Add filter for Event here, does not need any api call. Hardcode it. */}
        <div style={{ padding: '.5rem', marginBottom: '20px'}}>
            <p>Filter by Event:</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: '35rem'}}>
                <div className={filter === 'Sprints' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleEventFilter('Sprints')}>Sprints</div>
                <div className={filter === 'Distance' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleEventFilter('Distance')}>Distance</div>
                <div className={filter === 'Hurdles' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleEventFilter('Hurdles')}>Hurdles</div>
                <div className={filter === 'Relays' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleEventFilter('Relays')}>Relays</div>
                <div className={filter === 'Jumps' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleEventFilter('Jumps')}>Jumps</div>
                <div className={filter === 'Throws' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleEventFilter('Throws')}>Throws</div>
            </div>
        </div>
        
        <div style={{ width: '100%'}}>
            <ol className="list" style={{ display: 'flex', flexWrap: 'wrap', gap: '38px'}}>
                {eventData.filter(event => filter !== '' ? event.event === filter : event).map((event, index) => {
                    return (
                        <div style={{ width: `${ filter !== '' ? '100%' : '18rem'}`}} key={event.event}>
                        <h4>{event.event}</h4>
                        {event.types.map((type) => {
                            return (
                                <Link to={''} className="spanlinkstyle" key={type.name}>
                                    <li className="list-item">
                                        <span>{type.name}</span>
                                    </li>
                                </Link>
                            )
                        })}
                        </div>
                    )
                })}
            </ol>
        </div>
    </div>
  )
}