import { Link, useParams } from "react-router-dom"
import { fetchTrackAthletesByYear } from "../../../api/Track/athletes";
import { convertToNum } from "../../../helpers";
import { useQuery } from '@tanstack/react-query';

const trackAthleteByYearQuery = (yearId: number) => ({
    queryKey: ['athlete-season', yearId],
    queryFn: async () => {
        const xcrunner = await fetchTrackAthletesByYear(yearId);
        if (!xcrunner) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return xcrunner;
    },
  })

export const SeasonPage = () => {
    const { yearId } = useParams();
    const { data: athletes } = useQuery(trackAthleteByYearQuery(convertToNum(yearId)));
    console.log(athletes)

    return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h1>XXXX SCHS Track & Field Season</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            {/* First Column */}
            <div>
                <div>
                    <h2>Coaches</h2>
                    {/* Insert coaches */}
                </div>
                <div>
                    <h2>Athletes</h2>
                    <h4>Men</h4>
                    {/* insert men athletes */}
                    <h4>Women</h4>
                </div>
            </div>
            {/* Second column */}
            <div>
                <div>
                    <h2>Events</h2>
                    <h4>Sprints</h4>
                    {/* etc... */}
                </div>
            </div>
        </div>
    </div>
    )
}