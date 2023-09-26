import { useParams } from "react-router";
import { convertToNum, groupEvents } from "../../../helpers";
import { useQuery } from '@tanstack/react-query';
import { fetchTrackAthlete } from "../../../api/Track/athletes";

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

export const AthletePage = () => {
  const { athleteId } = useParams();
  const { data: trackAthlete } = useQuery(trackAthleteQuery(convertToNum(athleteId)));
  console.log(trackAthlete);
  console.log(groupEvents(trackAthlete || []));
  const events = groupEvents(trackAthlete || []);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
      <div>
        <h1>{trackAthlete && trackAthlete[0].fullName}</h1>
        <p>Insert breadcrumb</p>
      </div>
      {events && events.map((event: any) => {
        const filteredEvents1 = event.results.filter((result: any) => result.squadId === 1);
        const filteredEvents2 = event.results.filter((result: any) => result.squadId === 2);
        const filteredEvents3 = event.results.filter((result: any) => result.squadId === 3);
        const filteredEvents4 = event.results.filter((result: any) => result.squadId === 4);
        return (
          <>
          <h2>{event.event}</h2>
          {filteredEvents2.length > 0 && 
          <>
            <h4>Varsity Men</h4>
            <ol>
                {filteredEvents2.map((result: any) => {
                    return (
                    <div>
                        <li className="list-item">
                        <h4>{parseFloat(result.result1) ? `${parseInt(result.result1)}'` : `${result.result1}`}{parseInt(result.result2) ? `${parseFloat(result.result2)}"` : ''}</h4>
                            <h4>{result.year} ({result.grade}th Grade)</h4>
                        </li>
                    </div>
                )
                })}
            </ol>
          </>
          }
          {filteredEvents1.length > 0 && 
          <>
            <h4>Varsity Women</h4>
            <ol>
                {filteredEvents1.map((result: any) => {
                    return (
                    <div>
                        <li className="list-item">
                            <h4>{parseFloat(result.result1) ? `${parseInt(result.result1)}'` : `${result.result1}`}{parseInt(result.result2) ? `${parseFloat(result.result2)}"` : ''}</h4>
                            <h4>{result.year} ({result.grade}th Grade)</h4>
                        </li>
                    </div>
                )
                })}
            </ol>
          </>
          }
          {filteredEvents3.length > 0 && 
          <>
            <h4>Frosh/Soph Women</h4>
            <ol>
                {filteredEvents3.map((result: any) => {
                    return (
                    <div>
                        <li className="list-item">
                        <h4>{parseFloat(result.result1) ? `${parseInt(result.result1)}'` : `${result.result1}`}{parseFloat(result.result2) ? `${parseFloat(result.result2)}"` : ''}</h4>
                            <h4>{result.year} ({result.grade}th Grade)</h4>
                        </li>
                    </div>
                )
                })}
            </ol>
          </>
          }
          {filteredEvents4.length > 0 && 
          <>
            <h4>Frosh/Soph Men</h4>
            <ol>
                {filteredEvents4.map((result: any) => {
                    return (
                    <div>
                        <li className="list-item">
                        <h4>{parseInt(result.result1) ? `${parseFloat(result.result1)}'` : `${result.result1}`}{parseInt(result.result2) ? `${parseFloat(result.result2)}"` : ''}</h4>
                            <h4>{result.year} ({result.grade}th Grade)</h4>
                        </li>
                    </div>
                )
                })}
            </ol>
          </>
          }
          </>
        )
      })}
      {/* Alumni Records */}
      {/* { xcrunner && xcrunner?.length > 0 ? <h1>{xcrunner[0].firstname} {xcrunner[0].lastname}</h1> : <h1>Athlete</h1>} */}
      {/* {alumniRaces && alumniRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(alumniRaces[0].date)}</h2>
          <h2>Alumni Records</h2>
        </div>
      } */}
      {/* <ul className="list"> */}
        {/* {alumniRaces && alumniRaces.length > 0 && alumniRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })} */}
      {/* </ul> */}

      {/* 12th grade records */}
      {/* {seniorRaces && seniorRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(seniorRaces[0].date)}</h2>
          <h2>{seniorRaces[0].grade}th Grade Records</h2>
        </div>
      } */}
      {/* <ul className="list">
        {seniorRaces && seniorRaces.length > 0 && seniorRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul> */}

      {/* 11th grade records */}
      {/* {juniorRaces && juniorRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(juniorRaces[0].date)}</h2>
          <h2>{juniorRaces[0].grade}th Grade Records</h2>
        </div>
      }
      <ul className="list">
        {juniorRaces && juniorRaces.length > 0 && juniorRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul> */}

      {/* 0th grade records */}
      {/* {sophomoreRaces && sophomoreRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(sophomoreRaces[0].date)}</h2>
          <h2>{sophomoreRaces[0].grade}th Grade Records</h2>
        </div>
      }
      <ul className="list">
        {sophomoreRaces && sophomoreRaces.length > 0 && sophomoreRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul> */}
      
      {/* 9th grade records */}
      {/* {freshmenRaces && freshmenRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(freshmenRaces[0].date)}</h2>
          <h2>{freshmenRaces[0].grade}th Grade Records</h2>
        </div>
      }
      <ul className="list">
        {freshmenRaces && freshmenRaces.length > 0 && freshmenRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul> */}
      </div>
  )
}