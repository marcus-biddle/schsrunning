
import { useState } from 'react';
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
    const [ openDir, setOpenDir ] = useState(false);
    const [ component, setComponent ] = useState<any>(MENU[0].link);

    const handleMenuClick = (index: number) => {
        const page = MENU[index].link;
        setComponent(page);
        setOpenDir(false);
    }

    const handleDir = () => {
        setOpenDir(!openDir);
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
            <div className='sidemenu-grid'>
                <h4 onClick={() => handleDir()}>Directory</h4>
                {openDir && <ul>
                    {MENU.map((menu, index) => {
                        return (
                            <li key={menu.text} onClick={() => handleMenuClick(index)}>
                                {menu.text}
                            </li>
                        )
                    })}
                </ul>}
            </div>
            <div className='info-container'>
                {component}
            </div>
        </div>
    </div>
  )
}