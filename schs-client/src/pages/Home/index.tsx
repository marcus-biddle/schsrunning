
import './styled/index.css';
import { XCRaceResult, fetchTop4RaceResults } from '../../api/XCRaceResults.ts';
import { useQuery } from '@tanstack/react-query';
import Page from '../../SEO/meta/index.tsx';
// import MobileButtonGroup from '../../components/Filters/buttonGroup.tsx';
// import MobileGrid from '../../components/Grid/index.tsx';
// import MobileSlider from '../../components/MobileSLider/index.tsx';
// import { getYearFromDate } from '../../helpers/index.ts';
import img from '../../assets/scott.jpg'
import img2 from '../../assets/coaches.jpg'


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
    // const items = ['Athletes', 'Coaches', 'Seasons', 'Gallery'];

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
            <div className='hero-text'>
            <span style={{ textDecorationLine: 'underline', textDecorationColor: 'gold', textUnderlineOffset: '10px', textDecorationThickness: '1.5px'}}>Unleash</span>
                {' '}Your Passion 
                <p style={{ color: 'grey', fontSize: '16px', fontWeight: 'lighter', paddingTop: '24px'}}>Join the team and discover new possibilities</p>
            </div>    
            <div className='hero-cta-container'>
                <button className='hero-cta'>Explore</button>
            </div>
            <div className="fading-top" />
            <div className="image-container">
                <img
                className="image"
                src={img} // Replace with your actual image URL
                alt="Your Image"
                />
            </div>
        </div>
        <div style={{ margin: '56px 1rem 56px 1rem'}}>
            <p style={{ color: 'gold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.05px'}}>Spotlight</p>
            <p style={{ color: 'white', fontSize: '32px', fontFamily: "'Roboto', sans-serif", fontWeight: 'lighter'}}>Coaches</p>
            <div style={{ display: 'flex' ,width: '100%', height: '96px', backgroundColor: '#212629', borderRadius: '8px', overflow: 'hidden', margin: '8px 0 8px 0'}}>
                <img src={img2} alt="coach julie" style={{ objectFit: 'cover', height: '100%', width: '33%'}}/>
                <div style={{ padding: '8px'}}>
                    <p style={{ color: 'white'}}>Head Coach</p>
                    <p style={{ color: '#87CEFA', fontSize: '24px', paddingTop: '2px'}}>Julie L'Heureux</p>
                    
                </div>
            </div>
        </div>
        {/* <MobileButtonGroup />
        <MobileGrid items={items} /> */}
        {/* Cross Country Home */}
        {/* <>
        <div style={{ padding: '10px'}}>
            <h5 style={{ textTransform: 'uppercase', fontSize: '13.5px', color: 'gainsboro'}}>Check out {latestYear}</h5>
            <h3 style={{ paddingBottom: '16px'}}>Recent Races</h3>
            <MobileSlider items={groupedData} />
        </div>
        <div style={{ padding: '10px', marginTop: '32px'}}>
            <h5 style={{ textTransform: 'uppercase', fontSize: '13.5px', color: 'gainsboro'}}>Most visited</h5>
            <h3 style={{ paddingBottom: '16px'}}>Courses</h3>

        </div>
        <div style={{ padding: '10px', marginTop: '32px'}}>
            <h5 style={{ textTransform: 'uppercase', fontSize: '13.5px', color: 'gainsboro'}}>CSS Competitors</h5>
            <h3 style={{ paddingBottom: '16px'}}>Road Runners</h3>

        </div>
        </> */}
        
        {/* <div className='home-hero'>
            <div className='carousel-container'>
                <ImageCarousel images={teamImgs} interval={12000} />
            </div>
            <div className='main-block'>
                <div className='main-text-container'>
                    <h1 className='h1-white'>749</h1>
                    <h3 className='h3-white'>Athletes in our Database</h3>
                </div>
                <div className='main-cta-container'>
                        <button type='button' className='hero-button-primary' onClick={() => console.log('clicked')}>
                            View All
                            <BsArrowRight className="arrow-icon"/>
                        </button>
                </div>
            </div>
            <div className='secondary-block-container'>
                <div className='secondary-block'>
                    <h2 className='h2-black'>328</h2>
                    <h4 className='h4-black-75-lighter'>Cross Country Athletes</h4>
                    <div style={{ width: '100%', textAlign: 'center', alignItems: 'center'}}>
                        <button type='button' className='hero-button-secondary' onClick={() => console.log('clicked')}>
                            View All
                            <BsArrowRight style={{ width: '16px', height: '16px', position: 'absolute'}} />
                        </button>
                    </div>
                </div>
                <div className='secondary-block'>
                    <h2 className='h2-black'>482</h2>
                    <h4 className='h4-black-75-lighter'>Track Athletes</h4>
                    <div style={{ width: '100%', textAlign: 'center', alignItems: 'center'}}>
                        <button type='button' className='hero-button-secondary' onClick={() => console.log('clicked')}>
                            View All
                            <BsArrowRight style={{ width: '16px', height: '16px', position: 'absolute'}} />
                        </button>
                    </div>
                </div>
            </div>
            
        </div> */}
        {/* Images */}
        {/* <ImageCarousel images={teamImgs} interval={12000} /> */}
        {/* Latest races */}
        {/* <div style={{ marginBottom: '4rem'}}>
            <h2>Latest Race</h2>
            <h4 className="race-details">{athletes && `${athletes[0].courseName}, ${athletes[0].courseDistance}M (${formatDate(athletes[0].date)}`})</h4>
            <ol className="list" style={{ columnCount: '2'}}>
                {athletes && athletes.map((athlete) => (
                    <li key={athlete.competitorId} className="list-item">
                    <span>{athlete.firstName} {athlete.lastName}</span>
                    <span>{athlete.time}</span>
                    </li>
                ))}
            </ol>
        </div> */}
        {/* <div>
            <h2>Top Athletes</h2>
            <h4 className="race-details">Most recent record breaker: Name - event - time</h4>
            <div className="column-container">
                {topRecords.map((record) => (
                    <div className="column" key={record.type}>
                        <h4 className="record-heading">Top 3 Records - {record.type}</h4>
                        <ul className='top-list'>
                            {record.records.map((athlete) => (
                            <li key={athlete.name} className='top-athlete-item'>
                                <span>{athlete.name}</span>
                                <span>{athlete.event}</span>
                                <span>{athlete.result}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div> */}
        {/* <div>
            <h4 className="latest-race-heading">Latest Updates</h4>
            <p>12/12/21 - added 2021 XC Season</p>
            <p>12/01/21 added 2019 XC Season</p>
        </div> */}
    </div>
  )
}