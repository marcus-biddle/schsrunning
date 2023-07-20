import React, { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label: ReactNode;
  color?: string;
  type: "button" | "submit" | "reset" | undefined;
}

export const GenericButton: React.FC<ButtonProps> = ({ onClick, label, color, type }) => {
  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: color || '#333',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    height: '100%',
    margin: '0 5px '
  };

  return (
    <button type={type} onClick={onClick} style={buttonStyle}>
      {label}
    </button>
  );
};

