import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { ResultFormProps } from '../../../pages/Dashboard/Athlete';

interface XCFormProps {
    competitorId: string;
    raceId: number;
    onSubmitResult: (data: any) => void;
}

// const raceNameListQuery = () => ({
//     queryKey: ['racenames'],
//     queryFn: async () => {
//         const raceNames = await fetchRaceNames();
//         if (!raceNames) {
//             throw new Response('', {
//                 status: 404,
//                 statusText: 'Not Found',
//             })
//         }
//         return raceNames;
//     },
//   })

  // const courseListQuery = (courseDistance: number) => ({
  //   queryKey: ['courses', courseDistance],
  //   queryFn: async () => {
  //       const courses = await fetchCoursesByDistance(courseDistance);
  //       if (!courses) {
  //           throw new Response('', {
  //               status: 404,
  //               statusText: 'Not Found',
  //           })
  //       }
  //       return courses;
  //   },
  // })

// Tables being used: Course, Race, Result, RaceName, RaceCondition, Competitor
// Goal is to input into Result
// CompetitorId, raceId, time, pace (no date because that should exist with race)

const StepThreeForm: React.FC<XCFormProps> = ({ raceId, competitorId, onSubmitResult }) => {
  console.log(raceId, competitorId);  
  const [resultFormData, setResultFormData] = useState<ResultFormProps>({
        competitorId: competitorId,
        raceId: raceId,
        time: '',
        pace: ''
    })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResultFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    onSubmitResult(resultFormData);
    
  };

  // Split into 3 steps

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="time">Competitor Time:</label>
        <input
          type="text"
          id="time"
          name="time"
          value={resultFormData.time}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="pace">Competitor Pace:</label>
        <input
          type="text"
          id="pace"
          name="pace"
          value={resultFormData.pace}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
      {/* {competitorFound === true ? <p>Match Found!</p> : competitorFound === false ? <p>Must create a new competitor object.</p> : ''} */}
    </form>
  );
};

export default StepThreeForm;