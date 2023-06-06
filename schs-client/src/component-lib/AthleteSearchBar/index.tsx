import React, { useState } from 'react';
import styles from './styled/styles.module.css';
import { Link } from 'react-router-dom';

interface Athlete {
  id: number;
  name: string;
  path: string;
}

interface AthleteSearchProps {
  title: string;
  athletes: Athlete[];
}

const AthleteSearch: React.FC<AthleteSearchProps> = ({ title, athletes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={toggleAccordion}>
        {title}
      </div>
      {isOpen && (
        <div className={`${styles.accordionBody} ${isOpen && styles.open}`}>
          <input
            type="text"
            placeholder="Search Athletes"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.input}
          />
          <ul className={styles.athleteList}>
            {filteredAthletes.map((athlete) => (
              <li key={athlete.id} className={styles.athleteItem}>
                <Link to={`runners/${athlete.path}`}>
                  <div style={{ color: 'black', fontSize: '18px', fontWeight: 'bold'}}>
                    {athlete.name}
                  </div>
                  <div style={{ paddingLeft: '6px', color: '#333'}}>
                    Current Runner - 2023 - 12th grade
                  </div>
                  {/* Could add other stuff here too */}
                </Link>
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AthleteSearch;
