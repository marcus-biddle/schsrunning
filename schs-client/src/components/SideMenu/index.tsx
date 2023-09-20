import './styled.css';

interface SideMenuProps {
    list: any[];
}

const SideMenu = ({ list }: SideMenuProps) => {
    // Add active links, etc
  return (
    <div className='sidemenu-container'>
        <div>
            <h1>XCountry</h1>
        </div>
        <ul>
            {list.map((link: any) => {
                return (
                    <li key={link.text}>
                        <h4>{link.text}</h4>
                        <ul>
                            {link?.sublinks.map((sublink: any) => {
                                return (
                                    <li key={sublink.text}>
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