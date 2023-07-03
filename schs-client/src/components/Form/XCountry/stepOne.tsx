import React, { useState } from 'react';
import { Competitor, fetchCompetitorById } from '../../../api/competitors';
import { useQuery } from '@tanstack/react-query';
import './style.css'

interface XCFormProps {
    athleteId: string;
    onSubmitStepOneData: (data: any) => void;
    isDisabled: boolean;
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

const StepOneForm: React.FC<XCFormProps> = ({ athleteId, onSubmitStepOneData, isDisabled }) => {
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
    onSubmitStepOneData(competitor?.filter(comp => comp.year === parseInt(competitorFormData.year))[0]);
  };

  // Split into 3 steps

  return (
    <form onSubmit={handleStepOneSubmit} className="form-container">
  <div className="form-group">
    <label htmlFor="year" className="form-label">Year:</label>
    <input
      type="text"
      id="year"
      name="year"
      disabled={isDisabled}
      value={competitorFormData.year}
      onChange={handleStepOneInputChange}
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="grade" className="form-label">Grade:</label>
    <input
      type="text"
      id="grade"
      name="grade"
      disabled={isDisabled}
      value={competitorFormData.grade}
      onChange={handleStepOneInputChange}
      className="form-input"
    />
  </div>
  <button type="submit" disabled={isDisabled} className="form-button">Submit</button>
  {competitorFound === true ? (
    <p className='success-message'>Competitor Found!</p>
  ) : competitorFound === false ? (
    <p className='error-message'>Competitor Not Found. Create a new Competitor.</p>
  ) : null}
</form>

  );
};

export default StepOneForm;
