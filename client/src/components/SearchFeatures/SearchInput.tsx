import React from 'react'
import './index.css'

interface SearchInputProps {
    searchTerm: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    setSearchTerm: (value: string) => void;
}

export const SearchInput = ({ searchTerm, handleSearchChange, }: SearchInputProps) => {
  return (
    <div style={{position: 'relative', display: 'inline-block', height: '100%', width: '100%' }}>
        <input
            type="text"
            placeholder="Search Athletes"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
        />
    </div>
  )
}