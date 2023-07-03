import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import './style.css';
import { Athlete, createAthlete } from '../../../api/athletes';

interface AthleteData {
    firstName: string;
    lastName: string;
    startHsYear: number | null;
    endHsYear: number | null;
    genderId: number;
    confidentHsYear: number;
}

const CreateAthleteForm: React.FC = () => {
  const [athleteData, setAthleteData] = useState<AthleteData>({
        firstName: '',
        lastName: '',
        startHsYear: null,
        endHsYear: null,
        genderId: 0,
        confidentHsYear: 1
  });

    const addAthlete = useMutation({
        mutationFn: async (athleteData: Partial<Athlete>) => await createAthlete(athleteData),
        onSuccess: (data, variables) => {
            console.log('athlete', data, variables)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
  
        setAthleteData((prevData) => ({
        ...prevData,
        [name]: (name === 'genderId' || name === 'startHsYear' || name === 'endHsYear') ? parseInt(value, 10) : value,
        }));
    };
  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to API or perform validation
    console.log(athleteData);
    if (athleteData.startHsYear !== null && athleteData.endHsYear !== null) {
        addAthlete.mutate({
            firstName: athleteData.firstName,
            lastName: athleteData.lastName,
            startHsYear: athleteData.startHsYear,
            endHsYear: athleteData.endHsYear,
            genderId: athleteData.genderId,
            confidentHsYear: athleteData.confidentHsYear
        })
        console.log('finished');
    }
    
    // Reset form after submission
    setAthleteData({
        firstName: '',
        lastName: '',
        startHsYear: null,
        endHsYear: null,
        genderId: 0,
        confidentHsYear: 1
    });
  };

  return (
    <div className="container">
      <h3>Create New Athlete</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={athleteData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={athleteData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startHsYear">Start High School Year:</label>
          <input
            type="text"
            id="startHsYear"
            name="startHsYear"
            value={athleteData.startHsYear || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endHsYear">End High School Year:</label>
          <input
            type="text"
            id="endHsYear"
            name="endHsYear"
            value={athleteData.endHsYear || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genderId">Gender:</label>
          <select
            id="genderId"
            name="genderId"
            value={athleteData.genderId}
            onChange={handleChange}
            className="select-input"
            required
          >
            <option value={0}>Select Gender</option>
            <option value={2}>Male</option>
            <option value={3}>Female</option>
            <option value={0}>Unknown</option>
          </select>
        </div>
        <button type="submit" className="btn">Create</button>
      </form>
    </div>
  );
};

export default CreateAthleteForm;
