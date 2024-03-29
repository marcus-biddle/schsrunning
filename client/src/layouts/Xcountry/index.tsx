
import { useState } from 'react';
import Page from '../../Meta';
import './styled.css';
import { Runners } from './Runners';
import { Coaches } from './Coaches';
import { TopRunnerMenu } from './TopRunnerMenu';
import useActiveLink from '../../helpers/hooks/useActiveLink';
import { useNavbar } from '../../context/NavbarContext';
import { useMobile } from '../../helpers/hooks/useMobile';
import { TeamPhotos } from './TeamPhotos';

const MENU = [
    {
        text: 'Athletes',
        link: <Runners />
    },
    {
        text: 'Coaches',
        link: <Coaches />
    },
    {
        text: 'Top Runners',
        link: <TopRunnerMenu />
    },
    {
        text: 'Team Photos',
        link: <TeamPhotos />
    },
    {
        text: 'Misc',
        link: ''
    },
]
export const CrossCountry = () => {
    const { isActive, toggleActive } = useActiveLink('0');
    const { isNavbarOpen, toggleNavbar } = useNavbar();
    const [ component, setComponent ] = useState<string | JSX.Element>(MENU[0].link);
    const mobile = useMobile();

    console.log('xc home', isNavbarOpen)
    const handleMenuClick = (index: number) => {
        const page = MENU[index].link;

        setComponent(page);
        // setOpenDir(false);
        toggleActive(`${index}`)
        toggleNavbar();
    }

    // const handleDir = () => {
    //     setOpenDir(!openDir);
    // }

  return (
    
    <div className='xc-page'>
        <Page title="Cross Country Page" description="Records for Cross Country." />

        {/* <Header title='Cross Country' color="transparent" hideBreadcrumb={true}/> */}
        {/* <ImageCarousel images={teamImgs} interval={15000}/> */}
            {(isNavbarOpen || !mobile) && <div className='sidemenu-section'>
                {/* SHould be dynamic */}
                <p>Cross Country</p>
                <ul>
                    {MENU.map((menu, index) => {
                        return (
                            <li 
                                key={menu.text}
                                className={isActive(`${index}`) ? 'active-link' : ''}
                                onClick={() => handleMenuClick(index)}
                            >
                                {menu.text}
                            </li>
                        )
                    })}
                </ul>
            </div>}
            <div style={{ width: '100%'}}>
                {component}
            </div>
            {/* <div className='sidemenu-grid'>
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
            </div> */}
        </div>
  )
}