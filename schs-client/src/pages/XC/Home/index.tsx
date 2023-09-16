
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageCarousel from '../../../components/Carousel';
import { teamImgs } from '../../../assets';
import { GiRunningShoe, GiWhistle } from 'react-icons/gi';
import { MdOutlineTimer } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import Page from '../../../SEO/meta';
import { Header } from '../../../components/Header';
import './styled.css';
import { Runners } from '../Runners';

const MENU = [
    {
        text: 'Athletes',
        link: <Runners gender={{ gender: 'all'}} />
    },
    {
        text: 'Coaches',
        link: ''
    },
    {
        text: 'Teams',
        link: ''
    },
    {
        text: 'Team Photos',
        link: ''
    },
    {
        text: 'Misc',
        link: ''
    },
]
export const CrossCountry = () => {
    const [ pageView, setPageView ] = useState('');
    const [ component, setComponent ] = useState<any>(undefined);

    const handleMenuClick = (index: number) => {
        const page = MENU[index].link;
        setComponent(page);
    }

  return (
    
    <div className='page-container'>
        <Page title="Cross Country Page" description="Records for Cross Country." />

        <Header title='Cross Country' color="transparent" hideBreadcrumb={true}/>
        {/* <ImageCarousel images={teamImgs} interval={15000}/> */}
        <div>
            <div className='sidemenu'>
                <h4>Directory</h4>
                <ul>
                    {MENU.map((menu, index) => {
                        return (
                            <li key={menu.text} onClick={() => handleMenuClick(index)}>
                                {menu.text}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='info-container'>
                {component}
            </div>
        </div>
    </div>
  )
}