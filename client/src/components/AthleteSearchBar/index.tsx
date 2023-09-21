// import React, { useState } from 'react';
// import styles from './styled/styles.module.css';
// import { Link } from 'react-router-dom';
// import { XCAthlete } from '../../api/athletes';

// interface AthleteSearchProps {
//   athletes: XCAthlete[];
// }

// const AthleteSearch: React.FC<AthleteSearchProps> = ({ athletes }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredAthletes = athletes.filter((athlete) =>
//     athlete.firstName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className={styles.container}>
//       {isOpen && (
//         <div className={`${styles.accordionBody} ${isOpen && styles.open}`}>
//           <input
//             type="text"
//             placeholder="Search Athletes"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className={styles.input}
//           />
//           <ul className={styles.athleteList}>
//             {filteredAthletes.map((athlete) => (
//               <li key={athlete.id} className={styles.athleteItem}>
//                 <Link to={`runners/${athlete.path}`}>
//                   <div style={{ color: 'black', fontSize: '18px', fontWeight: 'bold'}}>
//                     {athlete.name}
//                   </div>
//                   <div style={{ paddingLeft: '6px', color: '#333'}}>
//                     Current Runner - 2023 - 12th grade
//                   </div>
//                   {/* Could add other stuff here too */}
//                 </Link>
                
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AthleteSearch;
