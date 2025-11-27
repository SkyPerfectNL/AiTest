import { AuthContextType } from '@interfaces/'
import { createContext } from 'react'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
