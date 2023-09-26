import React from 'react';
import { XCRunner } from '../../api/XCRunner';

interface DataTableProps {
  data: XCRunner[];
//   onEdit: (item: XCRunner) => void;
}

const XCAthleteDataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>
              ID
            </th>
            <th style={tableHeaderStyle}>
              Distance
            </th>
            <th style={tableHeaderStyle}>
              Course Name
            </th>
            <th style={tableHeaderStyle}>
              Race Name
            </th>
            <th style={tableHeaderStyle}>
              Time
            </th>
            <th style={tableHeaderStyle}>
              Pace
            </th>
            <th style={tableHeaderStyle}>
              Date
            </th>
            <th style={tableHeaderStyle}>
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: XCRunner, index: number) => (
            <tr key={`${item.competitorId}-${index}`}>
              <td style={tableCellStyle}>{item.competitorId}</td>
              <td style={tableCellStyle}>{item.coursedistance}</td>
              <td style={tableCellStyle}>{item.coursename}</td>
              <td style={tableCellStyle}>{item.racename}</td>
              <td style={tableCellStyle}>{item.time}</td>
              <td style={tableCellStyle}>{item.pace}</td>
              <td style={tableCellStyle}>{item.date}</td>
              <td style={tableCellStyle}>{item.grade}</td>
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

export default XCAthleteDataTable;