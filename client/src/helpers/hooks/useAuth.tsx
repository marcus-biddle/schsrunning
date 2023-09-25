import { useContext } from 'react'
import { AuthContext } from '../../context/authProvider'

export const useAuth = () => {
  console.log('useAuth', useContext(AuthContext));
  return useContext(AuthContext);
}