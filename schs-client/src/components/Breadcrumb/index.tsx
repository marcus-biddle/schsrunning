
import { useLocation, Link } from 'react-router-dom';
import { formatPath } from '../../helpers';

export const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  pathSegments.pop();

  return (
    <nav >
      <ul style={{ listStyleType: 'none', display: 'flex', fontSize: '18px', paddingBottom: '8px' }}>
        <li style={{ display: 'flex'}}>
          <Link to="/" style={{ textDecoration: 'none', textDecorationLine: 'none', color: '#000080'}}>Home</Link>
        </li>
        {pathSegments.map((segment, index) => (
          <li key={index} style={{ display: 'flex'}}>
            <span style={{ paddingLeft: '3px', paddingRight: '3px', fontWeight: 'bolder', color: '#000080' }}>/</span>
            <Link to={`/${pathSegments.slice(0, index + 1).join('/')}`} style={{ textDecoration: 'none', textDecorationLine: 'none', color: '#000080'}}>{formatPath(segment)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
