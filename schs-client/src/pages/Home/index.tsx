import ImageCarousel from '../../components/Carousel/index.tsx';
import './styled/index.css';
import { teamImgs } from '../../assets/index.tsx';
import { fetchRecentXCRaceResults } from '../../api/XCRaceResults.ts';
import { useQuery } from '@tanstack/react-query';
import Page from '../../SEO/meta/index.tsx';
import { BsArrowRight } from 'react-icons/bs';
import SportFilter from '../../components/Filters/buttonGroup.tsx';
import MobileButtonGroup from '../../components/Filters/buttonGroup.tsx';
import MobileGrid from '../../components/Grid/index.tsx';
import MobileSlider from '../../components/MobileSLider/index.tsx';

const recentRaceListQuery = (limit: number) => ({
    queryKey: ['race-results', limit],
    queryFn: async () => {
        const athletes = await fetchRecentXCRaceResults(limit);
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
  })

export const Home = () => {
    const { data: athletes } = useQuery(recentRaceListQuery(26));
    console.log(athletes);
    const items = ['Athletes', 'Coaches', 'Seasons', 'Gallery'];

  return (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: '#1F2627'}}>
        {/* TODO: Add SEO like below to other pages */}
        <Page title="Home" description="Welcome to SCHS Track and Cross Country home page." />
        <MobileButtonGroup />
        <MobileGrid items={items} />
        {/* Cross Country Home */}
        <>
        <div style={{ padding: '10px'}}>
            <h5 style={{ textTransform: 'uppercase', fontSize: '13.5px', color: 'gainsboro'}}>Check out 2020</h5>
            <h3 style={{ paddingBottom: '16px'}}>Recent Races</h3>
            {/* get top 4-5 recent events/meets to display here */}
            <MobileSlider items={items} />
        </div>
        <div style={{ padding: '10px', marginTop: '32px'}}>
            <h5 style={{ textTransform: 'uppercase', fontSize: '13.5px', color: 'gainsboro'}}>Most visited</h5>
            <h3 style={{ paddingBottom: '16px'}}>Courses</h3>
            {/* get top 4-5 recent events/meets to display here */}
            <MobileSlider items={items} />
        </div>
        <div style={{ padding: '10px', marginTop: '32px'}}>
            <h5 style={{ textTransform: 'uppercase', fontSize: '13.5px', color: 'gainsboro'}}>CSS Competitors</h5>
            <h3 style={{ paddingBottom: '16px'}}>Road Runners</h3>
            {/* get top 4-5 recent events/meets to display here */}
            <MobileSlider items={items} />
        </div>
        </>
        
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