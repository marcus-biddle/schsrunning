import React from 'react';
import { TrackAthleteResult } from '../../api/Track/athletes';

interface DataTableProps {
  data: TrackAthleteResult[];
//   onEdit: (item: TrackAthleteResult) => void;
}

const TrackAthleteDataTable: React.FC<DataTableProps> = ({ data }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchCategory, setSearchCategory] = useState('');
//   const [sortConfig, setSortConfig] = useState<{ key: keyof TrackAthleteResult; direction: string } | null>(null);

//   const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSearchCategory(event.target.value);
//   };

//   const handleColumnHeaderClick = (key: keyof TrackAthleteResult) => {
//     let direction = 'asc';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

  // Sort the data based on the sorting configuration
//   const sortedData = React.useMemo(() => {
//     if (sortConfig) {
//       const { key, direction } = sortConfig;
//       return [...data].sort((a, b) => {
//         if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
//         if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return data;
//   }, [data, sortConfig]);

  // Filter the data based on the search term and category
//   const filteredData = sortedData.filter((item: TrackAthleteResult) =>
//     String(item[searchCategory as keyof TrackAthleteResult])
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );
  return (
    <div>
      {/* <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchTermChange}
      /> */}
      {/* <select value={searchCategory} onChange={handleSearchCategoryChange}>
        <option value="">No Filter</option>
        <option value="athleteId">ID</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="startHsYear">Year Start</option>
        <option value="endHsYear">Year End</option>
      </select> */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>
              ID
            </th>
            <th style={tableHeaderStyle}>
              Event
            </th>
            <th style={tableHeaderStyle}>
              Time
            </th>
            <th style={tableHeaderStyle}>
              Type
            </th>
            <th style={tableHeaderStyle}>
              Race Group
            </th>
            <th style={tableHeaderStyle}>
              Year
            </th>
            <th style={tableHeaderStyle}>
              Grade
            </th>
            {/* <th style={tableHeaderStyle}>
              Actions
            </th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((item: TrackAthleteResult, index: number) => (
            <tr key={`${item.competitorId}-${index}`}>
              <td style={tableCellStyle}>{item.competitorId}</td>
              <td style={tableCellStyle}>{item.event}</td>
              <td style={tableCellStyle}>{item.result1}</td>
              <td style={tableCellStyle}>{item.result2}</td>
              <td style={tableCellStyle}>{item.squadName}</td>
              <td style={tableCellStyle}>{item.year}</td>
              <td style={tableCellStyle}>{item.grade}</td>
              {/* <td style={tableCellStyle}>
                <button
                    style={editButtonStyle}
                    onClick={() => onEdit(item)}
                >
                    Edit
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  padding: '8px',
  border: '1px solid #ddd',
  cursor: 'pointer',
};

const tableCellStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #ddd',
};

// const editButtonStyle: React.CSSProperties = {
//     backgroundColor: '#4caf50',
//     color: 'white',
//     padding: '8px 16px',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
// };

export default TrackAthleteDataTable;