import './styled.css';
import useActiveLink from '../../helpers/hooks/useActiveLink.js'

interface SideMenuProps {
    list: any[];
}

// Admin Side Menu
const SideMenu = ({ list }: SideMenuProps) => {
    const { isActive, toggleActive } = useActiveLink(null);

  return (
    <div className='sidemenu-container'>
        <div>
            <h1>XCountry</h1>
            <div className='actions-container'>
                <h4>Actions</h4>
                <ul>
                    <li>Import CSV</li>
                    {/* This link will be for emailing team, storing phone#'s, emergency contacts, etc */}
                    <li>Active Roster</li>
                </ul>
            </div>
        </div>
        <ul>
            {list.map((link: any) => {
                return (
                    <li key={link.text}>
                        <h4>{link.text}</h4>
                        <ul>
                            {link?.sublinks.map((sublink: any, index: number) => {
                                return (
                                    <li
                                    className={isActive(`${sublink.text}-${index}`) ? 'active' : ''}
                                    onClick={() => toggleActive(`${sublink.text}-${index}`)}
                                    key={sublink.text}>
                                        {sublink.text}
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default SideMenu