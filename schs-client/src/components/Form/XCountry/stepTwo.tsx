import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRaceNames } from '../../../api/raceNames';
import { fetchCoursesByDistance, Course } from '../../../api/courses';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchRace } from '../../../api/races';

interface XCFormProps {
    athleteId: string;
    onSubmitStepTwoCourseData: (data: any) => void;
    onSubmitStepTwoRaceData: (data: any) => void;
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
  });

  const raceQuery = (raceNameId: number, courseId: number, date: string) => ({
    queryKey: ['race', raceNameId, courseId, date],
    queryFn: async () => {
        const race = await fetchRace(raceNameId, courseId, date);
        if (!race) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return race;
    },
});

// Tables being used: Course, Race, Result, RaceName, RaceCondition, Competitor
// Goal is to input into Result
// CompetitorId, raceId, time, pace (no date because that should exist with race)

const StepTwoForm: React.FC<XCFormProps> = ({ athleteId, onSubmitStepTwoCourseData, onSubmitStepTwoRaceData }) => {
    console.log(athleteId)
    
    const { data: raceNames} = useQuery(raceNameListQuery());
    // RaceName -> Race -> Course
    const [raceFormData, setRaceFormData] = useState({
        racename: '', // dd make dynamic. get this then find matching race (raceId) THEN let them enter pace and time
        racenameId: 0,
        date: ''
    })
    const [courseFormData, setCourseFormData] = useState({
        coursedistance: '', // dd 
        coursename: '', // dd,
        courseId: 0
    })
    const { data: courses} = useQuery(courseListQuery(parseFloat(courseFormData.coursedistance)));
    const { data: race} = useQuery(raceQuery(raceFormData.racenameId, courseFormData.courseId, raceFormData.date));
    const [datePicker, setDatePicker] = useState<Date | null>();

    const handleDateChange = (date: Date | null) => {
      setDatePicker(date);
      if (date) {
        setRaceFormData((prevFormData) => ({
          ...prevFormData,
          ['date']: date.toISOString().substring(0, 10),
        }));
      }
    
    };

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
    if (name === 'racename') {
      const _racename = raceNames?.find(obj => obj['raceName'] === value);
      if (_racename) {
        setRaceFormData((prevFormData) => ({
          ...prevFormData,
          ['racenameId']: _racename.raceNameId,
        }));
      }
    }
  };

  const handleCourseSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCourseFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'coursename') {
      const _course = courses?.find(obj => obj['courseName'] === value);
      if (_course) {
        setCourseFormData((prevFormData) => ({
          ...prevFormData,
          ['courseId']: _course.courseId,
        }));
      }
    }
  };

  const handleStepTwoSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    onSubmitStepTwoCourseData(courseFormData);
    onSubmitStepTwoRaceData(raceFormData);

    console.log('race', race);
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
                    <option key={raceName.raceName} value={raceName.raceName}>{raceName.raceName}</option>
                )
            })}
        </select>
      </div>
      <div>
        <label>Date of event:</label>
        <DatePicker
          selected={datePicker}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="click to find date"
          locale="en"
        />
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
                  <option key={course.courseName} value={course.courseName}>{course.courseName}</option>
              )
          })}
      </select>
    </div>}
      <button type="submit">Submit</button>
      {/* {competitorFound === true ? <p>Match Found!</p> : competitorFound === false ? <p>Must create a new competitor object.</p> : ''} */}
    </form>
  );
};

export default StepTwoForm;