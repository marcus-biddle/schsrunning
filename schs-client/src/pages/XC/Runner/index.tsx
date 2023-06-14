import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { convertToNum, getYearFromDate } from "../../../helpers";
import { XCRunner, fetchXCRunner } from "../../../api/XCRunner";

export const Runner = () => {
  const [ runner, setRunner ] = useState<XCRunner[]>([]);
  const { athleteId } = useParams();
  const alumniRaces = runner.filter((row) => row.grade === 0);
  const seniorRaces = runner.filter((row) => row.grade === 12);
  const juniorRaces = runner.filter((row) => row.grade === 11);
  const sophomoreRaces = runner.filter((row) => row.grade === 10);
  const freshmenRaces = runner.filter((row) => row.grade === 9);

  useEffect(() => {
    fetchXCRunner(convertToNum(athleteId), '', -1)
        .then((data) => {
            setRunner(data);
        })
        .catch((error) => console.error(error));
}, [athleteId]);

  console.log('runner', runner);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
      {/* Alumni Records */}
      { runner.length > 0 ? <h1>{runner[0].firstname} {runner[0].lastname}</h1> : <h1>Runner</h1>}
      {alumniRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(alumniRaces[0].date)}</h2>
          <h2>Alumni Records</h2>
        </div>
      }
      <ul className="list">
        {alumniRaces.length > 0 && alumniRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul>

      {/* 12th grade records */}
      {seniorRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(seniorRaces[0].date)}</h2>
          <h2>{seniorRaces[0].grade}th Grade Records</h2>
        </div>
      }
      <ul className="list">
        {seniorRaces.length > 0 && seniorRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul>

      {/* 11th grade records */}
      {juniorRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(juniorRaces[0].date)}</h2>
          <h2>{juniorRaces[0].grade}th Grade Records</h2>
        </div>
      }
      <ul className="list">
        {juniorRaces.length > 0 && juniorRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul>

      {/* 0th grade records */}
      {sophomoreRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(sophomoreRaces[0].date)}</h2>
          <h2>{sophomoreRaces[0].grade}th Grade Records</h2>
        </div>
      }
      <ul className="list">
        {sophomoreRaces.length > 0 && sophomoreRaces.map((row) => {
          return (
            <li className="list-item">
              <h4>{getYearFromDate(row.date)} {row.racename}: {row.coursename}, {row.coursedistance}miles</h4>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{row.time} ({row.pace})</span>
            </li>
          )
        })}
      </ul>
      
      {/* 9th grade records */}
      {freshmenRaces.length > 0 && 
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h2>Season {getYearFromDate(freshmenRaces[0].date)}</h2>
          <h2>{freshmenRaces[0].grade}th Grade Records</h2>
        </div>
      }
      <ul className="list">
        {freshmenRaces.length > 0 && freshmenRaces.map((row) => {
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