import React, { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: ReactNode;
  color?: string;
}

const GenericButton: React.FC<ButtonProps> = ({ onClick, label, color }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: color || '#333',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      {label}
    </button>
  );
};

export default GenericButton;

