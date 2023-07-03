import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRaceNames } from '../../../api/raceNames';
import { fetchCoursesByDistance, Course } from '../../../api/courses';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchRace } from '../../../api/races';
import './style.css'

interface XCFormProps {
    onSubmitStepTwoRaceData: (data: any) => void;
    isDisabled: boolean;
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

const StepTwoForm: React.FC<XCFormProps> = ({ onSubmitStepTwoRaceData, isDisabled }) => {
    const { data: raceNames} = useQuery(raceNameListQuery());
    const [raceFormData, setRaceFormData] = useState({
        racename: '', 
        racenameId: 0,
        date: ''
    })
    const [courseFormData, setCourseFormData] = useState({
        coursedistance: '', 
        coursename: '', 
        courseId: 0
    })
    const { data: courses} = useQuery(courseListQuery(parseFloat(courseFormData.coursedistance)));
    const { data: race} = useQuery(raceQuery(raceFormData.racenameId, courseFormData.courseId, raceFormData.date));
    const [datePicker, setDatePicker] = useState<Date | null>();
    const [foundRace, setFoundRace] = useState<boolean>();

    const handleDateChange = (date: Date | null) => {
      setDatePicker(date);
      if (date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setRaceFormData((prevFormData) => ({
          ...prevFormData,
          ['date']: formattedDate,
        }));
        console.log(formattedDate);
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
    console.log('race', race);
    if (race?.raceId) {
      onSubmitStepTwoRaceData(race);
      setFoundRace(true);
    }
    else {
      setFoundRace(false);
    }
  };

  // Split into 3 steps

  return (
    <form onSubmit={handleStepTwoSubmit} className="form-container">
  <div className="form-group">
    <label htmlFor="racename" className="form-label">Race Name:</label>
    <select
      id="racename"
      name="racename"
      className="form-input"
      disabled={isDisabled}
      value={raceFormData.racename}
      onChange={handleRaceSelectChange}
    >
      <option value=""></option>
      {raceNames &&
        raceNames.map((raceName) => {
          return (
            <option key={raceName.raceName} value={raceName.raceName}>
              {raceName.raceName}
            </option>
          );
        })}
    </select>
  </div>
  <div className="form-group">
    <label className="form-label">Date of event:</label>
    <DatePicker
      selected={datePicker}
      onChange={handleDateChange}
      disabled={isDisabled}
      dateFormat="MM/dd/yyyy"
      placeholderText=""
      locale="en"
      className='form-input'
    />
  </div>
  <div className="form-group">
    <label htmlFor="coursedistance" className="form-label">Course Distance:</label>
    <input
      type="text"
      id="coursedistance"
      name="coursedistance"
      className="form-input"
      disabled={isDisabled}
      value={courseFormData.coursedistance}
      onChange={handleCourseInputChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="coursename" className="form-label">Course Name:</label>
    <select
      id="coursename"
      name="coursename"
      className="form-input"
      disabled={(courseFormData.coursedistance === '' && isDisabled === false) || isDisabled}
      value={courseFormData.coursename}
      onChange={handleCourseSelectChange}
    >
      <option value=""></option>
      {courses &&
        courses.length > 0 &&
        courses.map((course: Course) => {
          return (
            <option key={course.courseName} value={course.courseName}>
              {course.courseName}
            </option>
          );
        })}
    </select>
  </div>
  <button type="submit" className="form-button" disabled={isDisabled}>
    Submit
  </button>
  {foundRace === true ? <p className='success-message'>Race Found!</p> : foundRace === false ? <p className='error-message'>Must create a new race object.</p> : ''}
</form>

  );
};

export default StepTwoForm;