import React from 'react';

interface GenericData {
    [key: string]: any;
}

interface GenericDataProps {
    data: GenericData[];
    onEdit?: (key: any) => void;
    onView?: (key: any) => void;
    isEditable: boolean;
}

const GenericTable: React.FC<GenericDataProps> = ({ data, onEdit, isEditable, onView }) => {
  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key: string) => (
                <th key={key} style={tableHeaderStyle}>
                {key}
                </th>
            ))}
            {isEditable &&
            <th style={tableHeaderStyle}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item: GenericData, index: number) => {
            return (
                <tr key={index}>
                    {Object.entries(item).map(([key, value]: [string, any]) => (
                        <td key={key} style={tableCellStyle}>{value}</td>
                    ))}
                    {onEdit && 
                    <td style={tableCellStyle}>
                        <button
                            style={editButtonStyle}
                            onClick={() => onEdit(item)}
                        >
                        Edit
                        </button>
                    </td>
                    }
                    {onView &&
                    <td style={tableCellStyle}>
                    <button
                        style={editButtonStyle}
                        onClick={() => onView(item)}
                    >
                    View
                    </button>
                </td>
                    }
                </tr>
            )
          })}
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

const editButtonStyle: React.CSSProperties = {
    backgroundColor: '#2196f3',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default GenericTable;