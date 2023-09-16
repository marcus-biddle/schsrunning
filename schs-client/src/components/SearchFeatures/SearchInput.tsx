import React from 'react'
import './index.css'
import { GenericButton } from '../Button';

interface SearchInputProps {
    searchTerm: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    setSearchTerm: (value: string) => void;
}

export const SearchInput = ({ searchTerm, handleSearchChange, setSearchTerm}: SearchInputProps) => {
  return (
    <div style={{position: 'relative', display: 'inline-block', height: '33px', width: '90%' }}>
        <input
            type="text"
            placeholder="Search Athletes"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
        />
        <GenericButton type='reset' onClick={() => setSearchTerm('')} label="Reset" />
    </div>
  )
}