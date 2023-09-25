
import './styled/index.css';
import { XCRaceResult, fetchTop4RaceResults } from '../../api/XCRaceResults.ts';
import { useQuery } from '@tanstack/react-query';
import Page from '../../Meta/index.tsx';
import img from '../../assets/scott.jpg'
import { BsCalendarEvent } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { MdGroups } from 'react-icons/md';


const topCompRacesMenListQuery = () => ({
    queryKey: ['top-comp-races-men'],
    queryFn: async () => {
        const athletes = await fetchTop4RaceResults(2);
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
  })

  const topCompRacesWomenListQuery = () => ({
    queryKey: ['top-comp-races-women'],
    queryFn: async () => {
        const athletes = await fetchTop4RaceResults(3);
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
  })

// const recentRaceListQuery = (limit: number) => ({
//     queryKey: ['race-results', limit],
//     queryFn: async () => {
//         const athletes = await fetchRecentXCRaceResults(limit);
//         if (!athletes) {
//             throw new Response('', {
//                 status: 404,
//                 statusText: 'Not Found',
//             })
//         }
//         return athletes;
//     },
//   })

export const Home = () => {
    const { data: topMen } = useQuery(topCompRacesMenListQuery());
    const { data: topWomen } = useQuery(topCompRacesWomenListQuery());
    const combinedData = topMen?.concat(topWomen || []);
    console.log(topMen, topWomen);

    

    

    const groupedData: { [key: string]: XCRaceResult[] } = {};
    combinedData?.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
    });

    // const latestYear = getYearFromDate(Object.keys(groupedData)[0])

  return (
    <div className='home-page'>
        <Page title="Home" description="Welcome to SCHS Track and Cross Country home page." />
        <div className="container">
            <div className="overlay">
                {/* <div>
                <h4>Cross Country | Track</h4>
                <h4>|</h4>
                <h4>Track</h4>
                </div> */}
                
                <h1>SCHS Records</h1>
                {/* <h3>Records</h3> */}
                <div>
                    <button>Track & Field</button>
                    <button>Cross Country</button>
                </div>
            </div>
                <img
                src={img}
                alt="Image"
                />
        </div>

        <div className='icon-container'>
            <div>
                <BsCalendarEvent className='home-icon' />
                <h1>50+</h1>
                <p>Seasons</p>
            </div>
            <div>
                <BiTimeFive className='home-icon' />
                <h1>100+</h1>
                <p>Events</p>
            </div>
            <div className='center-icon-container'>
                <MdGroups className='home-icon' />
                <h1>700+</h1>
                <p>Athletes</p>
            </div>
        </div>
    </div>
  )
}