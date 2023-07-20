import {Breadcrumb} from '../Breadcrumb';

interface HeaderProps {
    title: string;
    color?: string;
  }

export const Header = ({ title, color }: HeaderProps) => {
  return (
    <header style={{ backgroundColor: `${color ? color : '#b0e0e6' }`, borderRadius: '8px', padding: '0 1rem 0 1rem', letterSpacing: '2px'}}>
        <h1>{title}</h1>
        <Breadcrumb />
    </header>
  )
}