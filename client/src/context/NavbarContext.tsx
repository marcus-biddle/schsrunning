import { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextType {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

interface NavbarProviderProps {
  children: ReactNode;
}

export function NavbarProvider({ children }: NavbarProviderProps) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
