import { fetchXCRunner } from '../../../api/XCRunner';
import { fetchTrackAthlete } from '../../../api/Track/athletes';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';
import XCAthleteDataTable from '../../../components/DataTable/xc';
import TrackAthleteDataTable from '../../../components/DataTable/track';
import { useState } from 'react';
import './style.css'
import StepTwoForm from '../../../components/Form/XCountry/stepTwo';
import StepThreeForm from '../../../components/Form/XCountry/stepThree';
import StepOneForm from '../../../components/Form/XCountry/stepOne';
import { Result, addXCResult } from '../../../api/results';
import { fetchAthlete } from '../../../api/athletes';
import { fetchCompetitor } from '../../../api/competitors';

const xcrunnerQuery = (athleteId: number) => ({
    queryKey: ['xcrunner', athleteId],
    queryFn: async () => {
        const xcrunner = await fetchXCRunner(athleteId, '', -1);
        if (!xcrunner) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return xcrunner;
    },
});

const trackAthleteQuery = (athleteId: number) => ({
    queryKey: ['trackAthlete', athleteId],
    queryFn: async () => {
        const xcrunner = await fetchTrackAthlete(athleteId);
        if (!xcrunner) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return xcrunner;
    },
});

const athleteQuery = (athleteId: number) => ({
    queryKey: ['athlete', athleteId],
    queryFn: async () => {
        const athlete = await fetchAthlete(athleteId);
        if (!athlete) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athlete;
    },
  })

  const competitorQuery = (athleteId: number) => ({
    queryKey: ['competitor', athleteId],
    queryFn: async () => {
        const athlete = await fetchCompetitor(athleteId);
        if (!athlete) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athlete.map((comp) => comp.competitorId);
    },
  })

interface CompFormProps {
    competitorId: number;
    athleteId: number;
    year: number;
    grade: number;
}

interface RaceFormProps {
    courseId: number;
    date: string;
    raceCOnditionId: number;
    raceId: number;
    raceNameId: number;
}

export interface ResultFormProps {
    competitorId: number;
    raceId: number;
    time: string;
    pace: string;
}

const EditAthlete = () => {
    const { athleteId } = useParams();
    const { data: athlete } = useQuery(athleteQuery(parseInt(athleteId || '')));
    const { data: trackAthlete } = useQuery(trackAthleteQuery(parseInt(athleteId || '')));
    const { data: xcrunner } = useQuery(xcrunnerQuery(parseInt(athleteId || '')));
    const { data: competitorIds } = useQuery(competitorQuery(parseInt(athleteId || '')));
    const [formType, setFormType] = useState<'Track' | 'Cross Country' | null>(null);
    const [stepOneData, setStepOneData] = useState<CompFormProps>();
    const [stepTwoRaceData, setStepTwoRaceData] = useState<RaceFormProps>();
    const [stepThreeData, setStepThreeData] = useState<ResultFormProps>();

    const createXCResultData = useMutation({
        mutationFn: async (resultData: Result) => await addXCResult(resultData),
        onSuccess: (data, variables) => {
            console.log('xc runner results', data, variables)
        }
    })

    const handleStepOneData = (data: any) => {
        setStepOneData(data);
    };

    const handleStepTwoRaceData = (data: any) => {
        setStepTwoRaceData(data);
    };

    const handleReset = () => {
        setFormType(null);
        setStepOneData(undefined);
        setStepTwoRaceData(undefined);
        setStepThreeData(undefined);
    };

    const handleResultData = (data: any) => {
        setStepThreeData(data);
    };

    const handleSubmit = () => {
        if (stepThreeData) {
            console.log('step3data is defined')
            createXCResultData.mutate({
                competitorId: stepThreeData.competitorId,
                raceId: stepThreeData.raceId,
                time: stepThreeData.time,
                pace: stepThreeData.pace
            })
        }
        handleReset();
    };

    console.log('1',stepOneData);
    console.log('2',stepTwoRaceData);
    console.log('3',stepThreeData);
    console.log('run',xcrunner)
    console.log(athlete)
  return (
    <div>
        {<div>
            <h2>{athlete && athlete.firstName} {athlete && athlete.lastName}</h2>
            <h3>Basic Info</h3> 
            {/* Revisit what else to add here */}
            {competitorIds ? null : <p>This is a new athlete with zero records.</p>}
            <div>
                <span>Gender:</span> <span>{athlete && (athlete.genderId === 2 ? 'Male' : athlete.genderId === 3 ? 'Female' : 'Unknown')}</span>
            </div>
            <div>
                <span>Athlete ID:</span> <span>{athlete && athlete.athleteId}</span>
            </div>
            <div>
                <span>Competitor IDs:</span> <span>{competitorIds && competitorIds.map(id => <li>{id}</li>)}</span>
            </div>
            <div>
                <div style={{ display: 'flex' }}>
                <h3>Add Record</h3>
                {(!stepOneData && formType !== null) && <button onClick={handleReset} style={{ backgroundColor: '#e53935',
                        color: 'white',
                        padding: '4px 20px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: '12px'}}>Cancel</button>}
                {(stepOneData && !stepThreeData) && <button onClick={handleReset} style={{ backgroundColor: '#e53935',
                        color: 'white',
                        padding: '4px 20px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: '12px'}}>Reset</button>}
                </div>
                
                {/* We should create two separate forms (track & xc) and then which ever they choose the form will be shown */}
                <div>
                    { !formType ? 
                    <div>
                        <button className={'trackButtonStyle'} onClick={() => setFormType('Track')}>Track</button>
                        <button className={'crossCountryButtonStyle'} onClick={() => setFormType('Cross Country')}>Cross Country</button>
                    </div>
                    : formType === 'Cross Country' ? 
                    <>
                    {!stepThreeData ? <div style={{ backgroundColor: 'rgb(211, 211, 211)', display: 'flex', justifyContent: 'space-evenly', borderRadius: '8px'}}>
                        <div style={{ width: '100%', textAlign: 'center', opacity: `${stepOneData ? '.5' : '1'}`, backgroundColor: `${stepOneData ? 'rgb(211, 211, 211)' : '#8bc34a'}`, borderRadius: '8px'}}>
                            <h4>Find Competitor</h4>
                            <StepOneForm athleteId={athleteId || ''} onSubmitStepOneData={handleStepOneData} isDisabled={stepOneData ? true : false}/>
                        </div>
                        <div style={{ width: '100%', textAlign: 'center', opacity: `${stepOneData && !stepTwoRaceData ? '1' : '.5'}`, backgroundColor: `${(stepOneData && stepTwoRaceData === undefined) ? '#8bc34a' : 'rgb(211, 211, 211)'}`, borderRadius: '8px'}}>
                            <h4>Find Race</h4>
                            {stepOneData && <StepTwoForm onSubmitStepTwoRaceData={handleStepTwoRaceData} isDisabled={(stepOneData && stepTwoRaceData === undefined ) ? false : true}/>}
                        </div>
                        <div style={{ width: '100%', textAlign: 'center', opacity: `${stepTwoRaceData ? '1' : '.5'}`, backgroundColor: `${stepTwoRaceData ? '#8bc34a' : 'rgb(211, 211, 211)'}`, borderRadius: '8px'}}>
                            <h4>Add Result</h4>
                            {stepOneData && stepTwoRaceData && <StepThreeForm competitorId={stepOneData.competitorId} raceId={stepTwoRaceData?.raceId} onSubmitResult={handleResultData}/>}
                        </div>
                    </div>
                    :
                    <div style={{ backgroundColor: '#000000', height: '20rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'}}>
                        <h4 style={{ fontSize: '24px', color: 'white'}}>Are you sure you want to add this record?</h4>
                        <p style={{ color: 'red'}}>Note: You can not undo this action after submitting.</p>
                        <div>
                        <button
                        type="submit"
                        style={{
                        backgroundColor: '#4a90e2',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginRight: '4px'
                        }} onClick={handleSubmit}>Submit Record</button>
                        <button
                        type="button"
                        style={{
                        backgroundColor: '#e53935',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginLeft: '6px'
                        }} onClick={handleReset}>Cancel</button>
                        </div>
                    </div>}
                    </>
                    
                    :
                    'track'}
                </div>
                
            </div>
            <h3>XC Records</h3>
            {xcrunner && xcrunner.length > 0 ? <div>
                <XCAthleteDataTable data={xcrunner || []} />
            </div> : <XCAthleteDataTable data={[]} />}
            <h3>Track Records</h3>
            {trackAthlete && trackAthlete.length > 0 ? <div>
                <TrackAthleteDataTable data={trackAthlete || []} />
            </div> : <TrackAthleteDataTable data={[]} />}
        </div>}
    </div>
  )
}



export default EditAthlete