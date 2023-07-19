// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { Athlete } from '../../api/athletes';

// interface DataTableProps {
//   data: Athlete[];
//   onEdit: (item: Athlete) => void;
// }

// const AthletesDataTable: React.FC<DataTableProps> = ({ data, onEdit }) => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchCategory, setSearchCategory] = useState('');
//   const [sortConfig, setSortConfig] = useState<{ key: keyof Athlete; direction: string } | null>(null);

//   const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSearchCategory(event.target.value);
//   };

//   const handleColumnHeaderClick = (key: keyof Athlete) => {
//     let direction = 'asc';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleAddAthlete = () => {
//     navigate('/admin/athletes/create')
//   }

//   // Sort the data based on the sorting configuration
//   const sortedData = React.useMemo(() => {
//     if (sortConfig) {
//       const { key, direction } = sortConfig;
//       return [...data].sort((a, b) => {
        // if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        // if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return data;
//   }, [data, sortConfig]);

//   // Filter the data based on the search term and category
//   const filteredData = sortedData.filter((item: Athlete) =>
//     String(item[searchCategory as keyof Athlete])
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );
//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent:'space-between'}}>
//         <div>
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={handleSearchTermChange}
//             style={{
//               padding: '0.5rem',
//               fontSize: '1rem',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               marginBottom: '1rem',
//               width: '200px',
//             }}
//           />
//           <select
//             value={searchCategory}
//             onChange={handleSearchCategoryChange}
//             style={{
//               padding: '0.5rem',
//               fontSize: '1rem',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               width: '200px',
//             }}
//           >
//             <option value="">No Filter</option>
//             <option value="athleteId">ID</option>
//             <option value="firstName">First Name</option>
//             <option value="lastName">Last Name</option>
//             <option value="startHsYear">Year Start</option>
//             <option value="endHsYear">Year End</option>
//             <option value="genderId">Gender ID</option>
//           </select>
//         </div>
//         <div>
//           <button
//             onClick={handleAddAthlete}
//             style={{
//               padding: '0.5rem 1rem',
//               fontSize: '1rem',
//               backgroundColor: '#4caf50',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             Add Athlete
//           </button>

//         </div>
//       </div>
      
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th
//               style={tableHeaderStyle}
//               onClick={() => handleColumnHeaderClick('athleteId')}
//             >
//               ID
//               {sortConfig && sortConfig.key === 'athleteId' && (
//                 <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </th>
//             <th
//               style={tableHeaderStyle}
//               onClick={() => handleColumnHeaderClick('firstName')}
//             >
//               First Name
//               {sortConfig && sortConfig.key === 'firstName' && (
//                 <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </th>
//             <th
//               style={tableHeaderStyle}
//               onClick={() => handleColumnHeaderClick('lastName')}
//             >
//               Last Name
//               {sortConfig && sortConfig.key === 'lastName' && (
//                 <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </th>
//             <th
//               style={tableHeaderStyle}
//               onClick={() => handleColumnHeaderClick('startHsYear')}
//             >
//               Year Start
//               {sortConfig && sortConfig.key === 'startHsYear' && (
//                 <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </th>
//             <th
//               style={tableHeaderStyle}
//               onClick={() => handleColumnHeaderClick('endHsYear')}
//             >
//               Year End
//               {sortConfig && sortConfig.key === 'endHsYear' && (
//                 <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </th>
//             <th
//               style={tableHeaderStyle}
//               onClick={() => handleColumnHeaderClick('genderId')}
//             >
//               Gender
//               {sortConfig && sortConfig.key === 'genderId' && (
//                 <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </th>
//             <th style={tableHeaderStyle}>
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item: Athlete) => (
//             <tr key={item.athleteId}>
//               <td style={tableCellStyle}>{item.athleteId}</td>
//               <td style={tableCellStyle}>{item.firstName}</td>
//               <td style={tableCellStyle}>{item.lastName}</td>
//               <td style={tableCellStyle}>{item.startHsYear}</td>
//               <td style={tableCellStyle}>{item.endHsYear}</td>
//               <td style={tableCellStyle}>{item.genderId === 2 ? 'Male' : 'Female'}</td>
//               <td style={tableCellStyle}>
//                 <button
//                     style={editButtonStyle}
//                     onClick={() => onEdit(item)}
//                 >
//                     Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Styles
// const tableHeaderStyle: React.CSSProperties = {
//   backgroundColor: '#f5f5f5',
//   padding: '8px',
//   border: '1px solid #ddd',
//   cursor: 'pointer',
// };

// const tableCellStyle: React.CSSProperties = {
//   padding: '8px',
//   border: '1px solid #ddd',
// };

// const editButtonStyle: React.CSSProperties = {
//     backgroundColor: '#2196f3',
//     color: 'white',
//     padding: '8px 16px',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
// };

// export default AthletesDataTable;
