import React, { useEffect, useState } from 'react';
import { Competitor, createCompetitor, fetchCompetitorById } from '../../../api/competitors';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
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

const StepOneForm: React.FC<XCFormProps> = ({ athleteId, onSubmitStepOneData, isDisabled }) => {
    const [competitorId, setCompetitorId] = useState('');
    const [competitorFormData, setCompetitorFormData] = useState({
        competitorId: competitorId,
        year: '',
        grade: '',
        athleteId: athleteId,
    })
    const [competitorFound, setCompetitorFound] = useState<boolean>();
    
    const { data: competitor } = useQuery(competitorQuery(parseFloat(competitorId)));
    
    const addCompetitor = useMutation({
      mutationFn: async (athleteData: Partial<Competitor>) => await createCompetitor(athleteData),
      onSuccess: (data, variables) => {
          console.log('competitor added', data, variables)
      }
    })

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

  const handleAddCompetitor = () => {
    const id = (competitorFormData.grade === '' || competitorFormData.grade === '0') ? `${athleteId}.${competitorFormData.year}` : `${athleteId}.${competitorFormData.grade}`;
    setCompetitorId(id);
    addCompetitor.mutate({
      athleteId: parseInt(competitorFormData.athleteId),
      competitorId: parseFloat(competitorId),
      year: parseInt(competitorFormData.year),
      grade: parseInt(competitorFormData.grade)
    })

    setCompetitorFound(true);
    onSubmitStepOneData(addCompetitor.variables);
  };

  const handleStepOneSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const _competitorFound = competitor && Object.values(competitor).filter((obj) => parseFloat(`${obj.competitorId}`) === parseFloat(competitorId)).some((obj) => parseFloat(`${obj.year}`) === parseFloat(competitorFormData.year));
    setCompetitorFound(_competitorFound);
    if (_competitorFound) {
      onSubmitStepOneData(competitor.filter(comp => comp.year === parseInt(competitorFormData.year))[0]);
    }

    console.log(competitor)
  };

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
      className="admin-form-input"
      required
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
      className="admin-form-input"
      required
    />
  </div>
  <button type="submit" disabled={isDisabled} className="form-button">{'Submit'}</button>
  {competitorFound === true ? (
    <p className='success-message'>Competitor Found!</p>
  ) : competitorFound === false ? (
    <>
      <p className='error-message'>Competitor Not Found.</p>
      <div>
        <p>Would you like to attach <br/><strong>Competitor ID: {competitorId}</strong><br/><strong>Year: {competitorFormData.year}</strong><br/>to this athlete?
        <button className='small-button' onClick={handleAddCompetitor}>Add ID</button>
        </p>
      </div>
    </>
  ) : null}
</form>

  );
};

export default StepOneForm;
