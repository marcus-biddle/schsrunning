import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRaceNames } from '../../../api/raceNames';
import { fetchCoursesByDistance, Course } from '../../../api/courses';

interface XCFormProps {
    athleteId: string;
}

const raceNameListQuery = () => ({
    queryKey: ['racenames'],
    queryFn: async () => {
        const raceNames = await fetchRaceNames();
        if (!raceNames) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return raceNames;
    },
  })

  const courseListQuery = (courseDistance: number) => ({
    queryKey: ['courses', courseDistance],
    queryFn: async () => {
        const courses = await fetchCoursesByDistance(courseDistance);
        if (!courses) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return courses;
    },
  })

// Tables being used: Course, Race, Result, RaceName, RaceCondition, Competitor
// Goal is to input into Result
// CompetitorId, raceId, time, pace (no date because that should exist with race)

const StepThreeForm: React.FC<XCFormProps> = ({ athleteId }) => {
  console.log(athleteId)
    // const [competitorId, setCompetitorId] = useState('');
    // First check this, else if unfound then do not continue.
    // const [competitorFormData, setCompetitorFormData] = useState({
    //     competitorId: competitorId,
    //     year: '',
    //     grade: '', // used to create a new competitorId,
    //     athleteId: athleteId,
    // })
    // const [competitorFound, setCompetitorFound] = useState<boolean | undefined>(undefined);
    
    const { data: raceNames} = useQuery(raceNameListQuery());
    // RaceName -> Race -> Course
    const [raceFormData, setRaceFormData] = useState({
        racename: '', // dd make dynamic. get this then find matching race (raceId) THEN let them enter pace and time
        raceId: ''
    })
    const [courseFormData, setCourseFormData] = useState({
        coursedistance: '', // dd 
        coursename: '', // dd 
    })
    const { data: courses} = useQuery(courseListQuery(parseFloat(courseFormData.coursedistance)));
    console.log('coursses', courses);
//   const [formData, setFormData] = useState({
//      // used to create a new competitorId. Needs to be conditional to first find the competitor. Could make this dynamic as we type
    
//      racecondition: '', // dd
//     pace: '',
//     time: '',
    
//   });

  // const handleRaceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setRaceFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  const handleCourseInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCourseFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRaceSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(name, value)
    setRaceFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(raceFormData);
  };

  const handleCourseSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCourseFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStepTwoSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Format competitorId
    console.log('race', raceFormData);
    console.log('course', courseFormData);
    // Perform form submission logic here
  };

  // Split into 3 steps

  return (
    <form onSubmit={handleStepTwoSubmit}>
      <div>
        <label htmlFor="racename">Race Name:</label>
        <select
          id="racename"
          name="racename"
          value={raceFormData.racename}
          onChange={handleRaceSelectChange}
        >
            <option value=''></option>
            {raceNames && raceNames.map((raceName) => {
                return (
                    <option value={raceName.raceName}>{raceName.raceName}</option>
                )
            })}
        </select>
      </div>
      <div>
        <label htmlFor="coursedistance">Course Distance:</label>
        <input
          type="text"
          id="coursedistance"
          name="coursedistance"
          value={courseFormData.coursedistance}
          onChange={handleCourseInputChange}
        />
      </div>
      {courseFormData.coursedistance !== '' && 
      <div>
      <label htmlFor="coursename">Course Name:</label>
      <select
        id="coursename"
        name="coursename"
        value={courseFormData.coursename}
        onChange={handleCourseSelectChange}
      >
        <option value=''></option>
          {courses && courses.length > 0 && courses.map((course: Course) => {
              return (
                  <option value={course.courseName}>{course.courseName}</option>
              )
          })}
      </select>
    </div>}
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
      {/* {competitorFound === true ? <p>Match Found!</p> : competitorFound === false ? <p>Must create a new competitor object.</p> : ''} */}
    </form>
  );
};

export default StepThreeForm;