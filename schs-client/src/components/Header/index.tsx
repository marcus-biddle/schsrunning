import React from 'react'
import Breadcrumb from '../Breadcrumb';

interface HeaderProps {
    title: string;
  }

const Header = ({ title }: HeaderProps) => {
  return (
    <header>
        <h1>{title}</h1>
        <Breadcrumb />
    </header>
  )
}

export default Header