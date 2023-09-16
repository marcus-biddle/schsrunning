import {Breadcrumb} from '../Breadcrumb';
import './styled.css'

interface HeaderProps {
    title: string;
    color?: string;
    hideBreadcrumb?: boolean;
  }

export const Header = ({ title, hideBreadcrumb }: HeaderProps) => {
  return (
    <header className='header-container'>
        <h1>{title}</h1>
        {!hideBreadcrumb ? <Breadcrumb /> : null}
    </header>
  )
}

export const SubHeader = ({ title }: HeaderProps) => {
  return (
    <header className='subheader-container'>
        <h1>{title}</h1>
    </header>
  )
}