
import { useParams } from 'react-router'

export const SeasonInfo = () => {
    const { year } = useParams();
    const coachesData = [
        { name: 'Julie L`Heuruex' },
        { name: 'Cal Ochoa' },
    ];
    const runnerData = [
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
    ];
    const raceData = [
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
    ]

  return (
    <div style={{ marginLeft: '10rem', marginRight: '10rem'}}>
        <h2>{year} SCHS Cross Country Season</h2>
        <div style={{ display: 'flex', justifyContent:'space-evenly'}}>
            <div>
                <div>
                    <h4>Coaches</h4>
                    <ol className="athlete-list">
                        {coachesData.map((coach) => (
                            <li key={coach.name} className="athlete-item">
                            <span>{coach.name}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Runners - Men</h4>
                    <ol className="athlete-list">
                        {runnerData.map((runner) => (
                            <li key={runner.name} className="athlete-item">
                            <span>{runner.name}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Runners - Women</h4>
                    <ol className="athlete-list">
                        {runnerData.map((runner) => (
                            <li key={runner.name} className="athlete-item">
                                <span>{runner.name}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <div>
                <div>
                    <h4>Races</h4>
                    <ol className="athlete-list" style={{ display: 'flex', flexDirection: 'column'}}>
                        {raceData.map((race) => (
                            <li key={race.name} className="athlete-item" style={{ display: 'flex', flexDirection: 'column'}}>
                                <div>
                                    <span>{race.date} -{' '}</span>
                                    <span>{race.type}:</span>
                                    <span> {race.name}</span>
                                </div>
                                
                                {/* Create Links */}
                                <div>
                                    <span>Men | Women | Combined</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Awards</h4>
                </div>
            </div>
        </div>
    </div>
  )
}