import React, { useState } from 'react';
import { Competitor, fetchCompetitorById } from '../../../api/competitors';
import { useQuery } from '@tanstack/react-query';

interface XCFormProps {
    athleteId: string;
    onSubmitStepOneData: (data: any) => void;
}

const competitorQuery = (competitorId: number) => ({
    queryKey: ['competitor', competitorId],
    queryFn: async () => {
        const xcrunner: Competitor[] = await fetchCompetitorById(competitorId);
        if (!xcrunner) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return xcrunner;
    },
  })

// Tables being used: Course, Race, Result, RaceName, RaceCondition, Competitor
// Goal is to input into Result
// CompetitorId, raceId, time, pace (no date because that should exist with race)

const StepOneForm: React.FC<XCFormProps> = ({ athleteId, onSubmitStepOneData }) => {
    const [competitorId, setCompetitorId] = useState('');
    // First check this, else if unfound then do not continue.
    const [competitorFormData, setCompetitorFormData] = useState({
        competitorId: competitorId,
        year: '',
        grade: '', // used to create a new competitorId,
        athleteId: athleteId,
    })
    const [competitorFound, setCompetitorFound] = useState<boolean>();
    
    const { data: competitor } = useQuery(competitorQuery(parseFloat(competitorId)));

  const handleStepOneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompetitorFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === 'grade') {
      setCompetitorId(`${athleteId}.${value}`)
    }
  };

  const handleStepOneSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const _competitorFound = competitor && Object.values(competitor).some((obj) => obj.year === parseInt(competitorFormData.year));
    setCompetitorFound(_competitorFound);
    onSubmitStepOneData(competitorFormData);
  };

  // Split into 3 steps

  return (
    <form onSubmit={handleStepOneSubmit}>
      <div>
        <label htmlFor="year">Year:</label>
        {/* Get year because this needs to append to the athleteId to get competitorId */}
        <input
          type="text"
          id="year"
          name="year"
          value={competitorFormData.year}
          onChange={handleStepOneInputChange}
        />
      </div>
      <div>
        <label htmlFor="grade">Grade:</label>
        <input
          type="text"
          id="grade"
          name="grade"
          value={competitorFormData.grade}
          onChange={handleStepOneInputChange}
        />
      </div>
      <button type="submit">Submit</button>
      {competitorFound === true ? 
      <p>Match Found! {competitor && `AthleteId: ${competitor[0].athleteId}, CompetitorId: ${competitor[0].competitorId}, Grade: ${competitor[0].grade}, Year: ${competitor[0].year}`}</p> 
      : competitorFound === false ? 
      <p>Match Not Found. Create a new Competitor.</p> 
      : ''}
    </form>
  );
};

export default StepOneForm;
