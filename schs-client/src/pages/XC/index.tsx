import React from 'react'
import AthleteSearch from '../../component-lib/AthleteSearchBar'
import { Link } from 'react-router-dom';

export const CrossCountry = () => {
    const athleteData = [
        { id: 1, name: 'Cal Ochoa' },
        { id: 2, name: 'Marcus Biddle' },
        { id: 3, name: 'Alejandro Martinez' },
        { id: 4, name: 'Max Howell' },
        // ... other athlete data
      ];
    const coachData = [
        { id: 1, name: 'Cal Ochoa' },
        { id: 2, name: 'Julie L\'Heureux' },
        { id: 3, name: 'Jamie Vierling' },
        { id: 4, name: 'Mario Bouza' },
        // ... other athlete data
    ]

    const top25MenData = [
        { id: 1, name: 'Crystal Springs' },
        { id: 2, name: 'Toro Park' },
        { id: 3, name: 'Central Park' },
        { id: 4, name: 'Baylands' },
        // ... other athlete data
    ]
  return (
    <div style={{ marginRight: '10rem', marginLeft: '10rem', display: 'flex', justifyContent: 'space-evenly'}}>
        <div>
            <div>
                <h2>XC Results by Runner</h2>
                <div >
                    <AthleteSearch athletes={athleteData} title='Men' />
                    <AthleteSearch athletes={athleteData} title='Women' />
                </div>
            </div>
            <div>
                <h2>XC Coaches</h2>
                <div >
                    <AthleteSearch athletes={coachData} title='Coaches' />
                </div>
            </div>
            <div style={{ paddingTop: '4rem'}}>
                Can't find a runner? Search by season 
                <span style={{ textDecorationLine: 'underline', cursor: 'pointer', paddingLeft: '5px'}}>
                    <Link to={'season/'}>
                    here
                    </Link>
                </span>
            </div>
        </div>
        <div>
            <div>
                <h2>XC Top 25 Individual List</h2>
                <div >
                    <AthleteSearch athletes={top25MenData} title='All Time Men' />
                    <AthleteSearch athletes={top25MenData} title='All Time Women' />
                </div>
            </div>
        </div>
    </div>
    
  )
}