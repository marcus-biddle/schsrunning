import React, { useState } from 'react'
import { SearchInput } from '../../components/SearchFeatures/SearchInput'
import { fetchAthletes } from '../../api/athletes';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { BiSearchAlt2 } from 'react-icons/bi';
import './styled.css';
import { AiOutlineUser } from 'react-icons/ai';

export const athleteListQuery = () => ({
    queryKey: ['all-athletes'],
    queryFn: async () => {
        const athletes = await fetchAthletes();
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
  })

export const SearchPage = () => {
    const navigate = useNavigate();
  const { data: athletes } = useQuery(athleteListQuery());
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowDropdown(event.target.value !== '');
  };

  const filteredData = athletes && athletes.filter((athlete) => {
    const fullName = `${athlete.firstName} ${athlete.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: '#1F2627', paddingTop: '32px'}}>
        <div style={{ height: '36px', width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', textAlign: 'center'}}>
            <input
                    type="text"
                    placeholder={athletes ? "Search Athletes" : "Loading..."}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ height: '100%', borderRadius: '4px', border: '1px solid #ccc', width: '70%', fontFamily: 'Lato, sans-serif', fontSize: '16px', paddingLeft: '8px'}}
                />
            <button style={{ height: '100%', width: '52px' , borderRadius: '4px', border: '1px solid #36CDE0', backgroundColor: '#36CDE0', fontFamily: 'Roboto', padding: '2px 6px 4px 6px', marginLeft: '2px', marginTop: '1px'}}>
                <BiSearchAlt2 style={{ width: '21px', height: '21px'}}/>
            </button>
        </div>
        <div className="search-list">
      {filteredData && showDropdown && filteredData.length > 0 && filteredData.slice(0,10).map((item) => (
        <div className="list-item" key={item.athleteId}>
          <div className="item-info">
          <span className="item-artist">{`${item.firstName} ${item.lastName}`}</span>
            <span className="item-title">{item.athleteId}</span>
          </div>
          <div style={{ position: 'relative', height: '24px', width: '32px'}}>
            <AiOutlineUser 
            onClick={() => navigate(`/athlete/${item.athleteId}`)}
            className="navbar-bottom-icon"/>
          </div>
        </div>
      ))}
    </div>

        
    </div>
  )
}