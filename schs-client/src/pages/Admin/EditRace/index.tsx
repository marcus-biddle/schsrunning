import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { raceNameListQuery } from '../RacesPage';
import { useParams } from 'react-router';

const EditRace = () => {
    const { data: raceNames } = useQuery(raceNameListQuery());
    const { raceNameId } = useParams()
  return (
    <div>
        <h1>Race: {raceNames && raceNames.filter(race => race.raceNameId === parseInt(raceNameId || '0'))[0].raceName}</h1>
    </div>
  )
}

export default EditRace