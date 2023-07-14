import { useParams } from "react-router";
import { convertToNum, getYearFromDate } from "../../../helpers";
import { fetchXCRunner } from "../../../api/XCRunner";
import { useQuery } from '@tanstack/react-query';
import Header from "../../../components/Header";

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

export const loader = (queryClient: any) => async ({ params }: any) => {
  if (!queryClient.getQueryData(xcrunnerQuery(params.athleteId).queryKey)) {
    return await queryClient.fetchQuery(xcrunnerQuery(params.athleteId));
  }
  return queryClient.getQueryData(xcrunnerQuery(params.athleteId).queryKey);
}

export const Runner = () => {
  const { athleteId } = useParams();
  const { data: xcrunner } = useQuery(xcrunnerQuery(convertToNum(athleteId)));
  const alumniRaces = xcrunner?.filter((row) => row.grade === 0);
  const seniorRaces = xcrunner?.filter((row) => row.grade === 12);
  const juniorRaces = xcrunner?.filter((row) => row.grade === 11);
  const sophomoreRaces = xcrunner?.filter((row) => row.grade === 10);
  const freshmenRaces = xcrunner?.filter((row) => row.grade === 9);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
      <Header title={`${xcrunner && xcrunner[0].firstname} ${xcrunner && xcrunner[0].lastname}`} />
      {/* Alumni Records */}
      {alumniRaces && alumniRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Latest Season {getYearFromDate(alumniRaces[0].date)}</h2>
          <h2>Alumni Records</h2>
        </div>
      }
      <ul className="list">
        {alumniRaces && alumniRaces.length > 0 && alumniRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul>

      {/* 12th grade records */}
      {seniorRaces && seniorRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(seniorRaces[0].date)}</h2>
          <h2>{seniorRaces[0].grade}th Grade Records</h2>
        </div>
      }
      <ul className="list">
        {seniorRaces && seniorRaces.length > 0 && seniorRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul>

      {/* 11th grade records */}
      {juniorRaces && juniorRaces.length > 0 && 
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
      </ul>

      {/* 0th grade records */}
      {sophomoreRaces && sophomoreRaces.length > 0 && 
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
      </ul>
      
      {/* 9th grade records */}
      {freshmenRaces && freshmenRaces.length > 0 && 
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
      </ul>
    </div>
  )
}