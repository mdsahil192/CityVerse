import { createContext, useContext, useEffect, useState } from 'react'

export interface User {
  id: string
  username: string
  mobile: string
  email?: string
}

export interface Session {
  access_token: string
}

interface AuthContextType {
  session: Session | null
  user: User | null
  isLoading: boolean
  signIn: (token: string, user: User) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signIn: () => {},
  signOut: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage on mount
    const token = localStorage.getItem('cityverse_token')
    const storedUser = localStorage.getItem('cityverse_user')
    
    if (token && storedUser) {
      setSession({ access_token: token })
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse user from local storage")
      }
    }
    
    setIsLoading(false)
  }, [])

  const signIn = (token: string, loggedInUser: User) => {
    setSession({ access_token: token })
    setUser(loggedInUser)
    localStorage.setItem('cityverse_token', token)
    localStorage.setItem('cityverse_user', JSON.stringify(loggedInUser))
  }

  const signOut = () => {
    setSession(null)
    setUser(null)
    localStorage.removeItem('cityverse_token')
    localStorage.removeItem('cityverse_user')
  }

  return (
    <AuthContext.Provider value={{ session, user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
