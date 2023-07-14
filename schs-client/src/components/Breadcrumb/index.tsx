import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { formatPath } from '../../helpers';

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  return (
    <nav>
      <ul style={{ listStyleType: 'none', display: 'flex' }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', textDecorationLine: 'none', color: '#007bff', fontSize: '14px'}}>Home</Link>
        </li>
        {pathSegments.map((segment, index) => (
          <li key={index} style={{ display: 'flex'}}>
            <span style={{ paddingLeft: '3px', paddingRight: '3px', fontWeight: 'bolder', color: '#007bff'}}>/</span>
            <Link to={`/${pathSegments.slice(0, index + 1).join('/')}`} style={{ textDecoration: 'none', textDecorationLine: 'none', color: '#007bff', fontSize: '14px'}}>{formatPath(segment)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
