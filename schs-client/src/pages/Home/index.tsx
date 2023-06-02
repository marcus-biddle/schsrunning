import React from 'react'
import ImageCarousel from '../../component-lib/carousel';
import './styled/index.css';
import { teamImgs } from '../../assets/index.tsx';

export const Home = () => {
    // const images = [
    //     img1,
    //     img2,
    //     img3,
    //     img4,
    //     img5,
    //   ];

    const athletes = [
        {
            name: 'Sebestion McMahon',
            time: '16:47.09(5:41.7)'
        },
        {
            name: 'James Kepner',
            time: '17:54.7 (6:04.3)',
        },
        {
            name: 'Dominic McMahon',
            time: '18:03.2 (6:07.2)'
        },
        {
            name: 'Example',
            time: '00:00.0 (0:00.0)'
        },
        {
            name: 'Example',
            time: '00:00.0 (0:00.0)'
        },
        {
            name: 'Example',
            time: '00:00.0 (0:00.0)'
        },
        {
            name: 'Example',
            time: '00:00.0 (0:00.0)'
        },
        {
            name: 'Example',
            time: '00:00.0 (0:00.0)'
        },
        {
            name: 'Example',
            time: '00:00.0 (0:00.0)'
        },
        {
            name: 'Example',
            time: '00:00.0 (0:00.0)'
        },
    ]

    const topRecords = [
        {
            type: 'Men',
            records: [
                {
                    name: 'Cedric Lastname',
                    event: '1600m',
                    result: '4:16.7'
                },
                {
                    name: 'Max Howell',
                    event: '3200m',
                    result: '9:29.2'
                },
                {
                    name: 'Alejandro Martinez',
                    event: '400m',
                    result: '0:55.2'
                },
            ]
        },
        {
            type: 'Women',
            records: [
                {
                    name: 'Jasmine',
                    event: '1600m',
                    result: '4:16.7'
                },
                {
                    name: 'Julie',
                    event: '3200m',
                    result: '9:29.2'
                },
                {
                    name: 'Margaret',
                    event: '400m',
                    result: '0:55.2'
                },
            ]
        },
    ]
  return (
    <div style={{ marginLeft: '10rem', marginRight: '10rem'}}>
        {/* Images */}
        <ImageCarousel images={teamImgs} interval={12000} />
        {/* Latest races */}
        <div style={{ marginBottom: '4rem'}}>
            <h2>Latest Race</h2>
            <h4 className="race-details">Crystal Springs, 2.95M (2021-11-02)</h4>
            <ol className="athlete-list">
                {athletes.map((athlete, index) => (
                    <li key={athlete.name} className="athlete-item">
                    <span>{athlete.name}</span>
                    <span>{athlete.time}</span>
                    </li>
                ))}
            </ol>
        </div>
        <div>
            <h2>Top Athletes</h2>
            <h4 className="race-details">Most recent record breaker: Name - event - time</h4>
            <div className="column-container">
                {topRecords.map((record) => (
                    <div className="column" key={record.type}>
                        <h4 className="record-heading">Top 3 Records - {record.type}</h4>
                        <ul className='top-athlete-list'>
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
        </div>
        <div>
        <h2 className="latest-race-heading">Latest Updates</h2>
        <p>12/12/21 - added 2021 XC Season</p>
        <p>12/01/21 added 2019 XC Season</p>
        </div>
    </div>
  )
}