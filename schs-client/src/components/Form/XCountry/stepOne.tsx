import React, { useState } from 'react';
import { Competitor, fetchCompetitorById } from '../../../api/competitors';
import { useQuery } from '@tanstack/react-query';

interface XCFormProps {
    athleteId: string;
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

const StepOneForm: React.FC<XCFormProps> = ({ athleteId }) => {
    const [competitorId, setCompetitorId] = useState('');
    // First check this, else if unfound then do not continue.
    const [competitorFormData, setCompetitorFormData] = useState({
        competitorId: competitorId,
        year: '',
        grade: '', // used to create a new competitorId,
        athleteId: athleteId,
    })
    const [competitorFound, setCompetitorFound] = useState<boolean | undefined>(undefined);
    
    const { data: competitor } = useQuery(competitorQuery(parseFloat(competitorId)));
    // RaceName -> Race -> Course
//     const [raceFormData, setRaceFormData] = useState({
//         racename: '', // dd make dynamic. get this then find matching race (raceId) THEN let them enter pace and time
//         raceId: ''
//     })
//     const [courseFormData, setCourseFormData] = useState({
//         coursedistance: '', // dd 
//         courseName: '', // dd 
//     })
//   const [formData, setFormData] = useState({
//      // used to create a new competitorId. Needs to be conditional to first find the competitor. Could make this dynamic as we type
    
//      racecondition: '', // dd
//     pace: '',
//     time: '',
    
//   });

  const handleStepOneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompetitorFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStepOneSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCompetitorFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStepOneSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Format competitorId
    const _competitorId = `${athleteId}.${competitorFormData.grade}`
    setCompetitorId(_competitorId);
    const _competitorFound = competitor && Object.values(competitor).some((obj) => obj.year === parseInt(competitorFormData.year));
    setCompetitorFound(_competitorFound);
    console.log(_competitorFound);
    console.log(competitorFormData, _competitorId);
    // Perform form submission logic here
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
      {/* <div>
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          name="courseName"
          value={formData.courseName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="grade">Grade:</label>
        <input
          type="text"
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="pace">Pace:</label>
        <input
          type="text"
          id="pace"
          name="pace"
          value={formData.pace}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="racename">Race Name:</label>
        <input
          type="text"
          id="racename"
          name="racename"
          value={formData.racename}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="racecondition">Race Condition:</label>
        <input
          type="text"
          id="racecondition"
          name="racecondition"
          value={formData.racecondition}
          onChange={handleInputChange}
        />
      </div> */}
      <button type="submit">Submit</button>
      {competitorFound === true ? <p>Match Found!</p> : competitorFound === false ? <p>Must create a new competitor object.</p> : ''}
    </form>
  );
};

export default StepOneForm;
