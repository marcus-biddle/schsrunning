import { fetchXCRunner } from '../../../api/XCRunner';
import { fetchTrackAthlete } from '../../../api/Track/athletes';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import XCAthleteDataTable from '../../../components/DataTable/xc';
import TrackAthleteDataTable from '../../../components/DataTable/track';
import { useState } from 'react';
import './style.css'
import StepTwoForm from '../../../components/Form/XCountry/stepTwo';
import StepThreeForm from '../../../components/Form/XCountry/stepThree';
import StepOneForm from '../../../components/Form/XCountry/stepOne';

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

interface CompFormProps {
    competitorId: string;
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
    competitorId: string;
    raceId: number;
    time: string;
    pace: string;
}

const EditAthlete = () => {
    const { athleteId } = useParams();
    const { data: trackAthlete } = useQuery(trackAthleteQuery(parseInt(athleteId || '')));
    const { data: xcrunner } = useQuery(xcrunnerQuery(parseInt(athleteId || '')));
    const [formType, setFormType] = useState<'Track' | 'Cross Country' | null>(null);
    const [stepOneData, setStepOneData] = useState<CompFormProps>();
    const [stepTwoRaceData, setStepTwoRaceData] = useState<RaceFormProps>();
    const [stepThreeData, setStepThreeData] = useState<ResultFormProps>();

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

    console.log('1',stepOneData);
    console.log('2',stepTwoRaceData);
    console.log('3',stepThreeData);
  return (
    <div>
        <h2>{trackAthlete && trackAthlete[0].fullName}</h2>
        <h3>Basic Info</h3> 
        {/* Revisit what else to add here */}
        <div>
            <span>Gender:</span> <span>{trackAthlete && (trackAthlete[0].genderId === 2 ? 'Male' : trackAthlete[0].genderId === 3 ? 'Female' : 'Unknown')}</span>
        </div>
        <div>
            <span>Athlete ID:</span> <span>{trackAthlete && trackAthlete[0].athleteId}</span>
        </div>
        <div>
            <div style={{ display: 'flex' }}>
            <h3>Add Record</h3>
            {(stepOneData || stepThreeData) && <button onClick={handleReset} style={{ height: '25px', marginTop: 'auto', marginBottom: 'auto' }}>Reset</button>}
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
                    <div style={{ opacity: `${stepOneData ? '.5' : '1'}`, backgroundColor: `${stepOneData ? 'rgb(211, 211, 211)' : '#8bc34a'}`, borderRadius: '8px'}}>
                        <h4>Find Competitor</h4>
                        <StepOneForm athleteId={athleteId || ''} onSubmitStepOneData={handleStepOneData} isDisabled={stepOneData ? true : false}/>
                    </div>
                    <div style={{ opacity: `${stepOneData ? '1' : '.5'}`, backgroundColor: `${(stepOneData && stepTwoRaceData === undefined) ? '#8bc34a' : 'rgb(211, 211, 211)'}`, borderRadius: '8px'}}>
                        <h4>Find Race</h4>
                        {stepOneData && <StepTwoForm onSubmitStepTwoRaceData={handleStepTwoRaceData} isDisabled={(stepOneData && stepTwoRaceData === undefined ) ? false : true}/>}
                    </div>
                    <div style={{ opacity: `${stepTwoRaceData ? '1' : '.5'}`, backgroundColor: `${stepTwoRaceData ? '#8bc34a' : 'rgb(211, 211, 211)'}`, borderRadius: '8px'}}>
                        <h4>Add Result</h4>
                        {stepOneData && stepTwoRaceData && <StepThreeForm competitorId={stepOneData.competitorId} raceId={stepTwoRaceData?.raceId} onSubmitResult={handleResultData}/>}
                    </div>
                </div>
                :
                <div style={{ height: '12rem', backgroundColor: '#8bc34a'}}>
                    <h4>Are you sure you want to add this record?</h4>
                    <button>Submit Record</button>
                </div>}
                </>
                
                :
                'track'}
            </div>
            
        </div>
        <div>
            {/* Have the form/options to change things here */}
            <h3>XC Records</h3>
            <XCAthleteDataTable data={xcrunner || []} />
        </div>
        <div>
            <h3>Track Records</h3>
            <TrackAthleteDataTable data={trackAthlete || []} />
        </div>
    </div>
  )
}



export default EditAthlete