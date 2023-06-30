import { fetchXCRunner } from '../../../api/XCRunner';
import { fetchTrackAthlete } from '../../../api/Track/athletes';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import XCAthleteDataTable from '../../../components/DataTable/xc';
import TrackAthleteDataTable from '../../../components/DataTable/track';

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
})

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
})

const EditAthlete = () => {
    const { athleteId } = useParams();
    const { data: trackAthlete } = useQuery(trackAthleteQuery(parseInt(athleteId || '')));
    const { data: xcrunner } = useQuery(xcrunnerQuery(parseInt(athleteId || '')));
    console.log('track', trackAthlete);
    console.log('xc', xcrunner);
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
            <h3>Add Record</h3>
            {/* We should create two separate forms (track & xc) and then which ever they choose the form will be shown */}
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