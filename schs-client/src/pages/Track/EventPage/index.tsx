import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom'
import { TFEvent, fetchAthletesByEvent, fetchAthletesByEventByYear } from '../../../api/Track/events';
import { useQuery } from '@tanstack/react-query';
import { convertGrade, urlContains } from '../../../helpers';

const eventQuery = (eventType: string, athleteId: number) => ({
    queryKey: ['athlete', eventType, athleteId],
    queryFn: async () => {
        const athletes = await fetchAthletesByEvent(eventType, athleteId);
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
})

const eventByYearQuery = (eventType: string, athleteId: number, yearId: number) => ({
    queryKey: ['athlete', eventType, athleteId],
    queryFn: async () => {
        const athletes = await fetchAthletesByEventByYear(eventType, athleteId, yearId);
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
})

export const EventPage = () => {
    const [activeButton, setActiveButton] = useState<string>('all');
    const location = useLocation();
    const eventType: string = urlContains(location.pathname, ['track-events', 'field-events']) || 'track';
    const { eventId, yearId } = useParams();
    const [filter, setFilter] = useState<string>('all');

    const handleGradeFilter = (value: string) => {
        setFilter(value === filter ? 'all' : value);
    }

    const { data: athletes } = yearId ? useQuery(eventByYearQuery(eventType, parseInt(eventId || '1'), parseInt(yearId || ''))) : useQuery(eventQuery(eventType, parseInt(eventId || '1')));
    console.log(athletes)
    const filterAthletesByGrade = athletes?.filter(athlete => filter !== 'all' ? athlete.grade === convertGrade(filter) : athlete);
    const filteredAthletesByGender = filterAthletesByGrade?.filter((athlete: TFEvent) => activeButton === "women" ? athlete.genderId === 3 : activeButton === "men" ? athlete.genderId === 2 : athlete);
    const handleButtonClick = (value: string) => {
        setActiveButton(value === activeButton ? 'all' : value);
    };

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem', minHeight: '100vh'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{athletes && athletes[0].event} Records ({athletes && athletes.length})</h2>
            <div style={{ borderRadius: '8px', marginTop: 'auto', overflow: 'hidden', height: '35px'}}>
            <button
                className={`toggle-button ${activeButton === 'men' ? 'active' : ''}`}
                onClick={() => handleButtonClick('men')}
            >
                Men
            </button>
            <button
                className={`toggle-button ${activeButton === 'women' ? 'active' : ''}`}
                onClick={() => handleButtonClick('women')}
            >
                Women
            </button>
            </div>
        </div>
        {/* Create filter for grades here */}
        <div style={{ padding: '.5rem', marginBottom: '20px'}}>
            <p>Filter by Grade:</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: '22rem'}}>
                <div className={filter === 'senior' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleGradeFilter('senior')}>Senior</div>
                <div className={filter === 'junior' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleGradeFilter('junior')}>Junior</div>
                <div className={filter === 'sophomore' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleGradeFilter('sophomore')}>Sophomore</div>
                <div className={filter === 'freshmen' ? 'filter-btn-active' : 'filter-btn'} onClick={() => handleGradeFilter('freshmen')}>Freshmen</div>
            </div>
        </div>
        
        <div>
            <ol className="list">
                {filteredAthletesByGender?.map((athlete: TFEvent) => {
                    return (
                        <Link to={''} className="spanlinkstyle" key={athlete.competitorId}>
                            <li className="list-item">
                                <span>{athlete.firstName} {athlete.lastName} ({athlete.year}{athlete.grade < 13 ? `, ${athlete.grade}th grade` : ''})</span>
                                <span>{athlete.time ? athlete.time : `${athlete.footPartOfDistance}'${athlete.inchPartOfDistance?.toString() !== '0.00'  ? `${parseInt(athlete.inchPartOfDistance?.toString() || '0').toFixed(1)}"` : ''}`}</span>
                            </li>
                        </Link>
                    )
                })}
            </ol>
        </div>
    </div>
  )
}