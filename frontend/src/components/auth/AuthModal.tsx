import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Loader2, Map, Phone, User as UserIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useAuth } from './AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [mobile, setMobile] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile, password })
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.detail || 'Login failed')
        signIn(data.access_token, data.user)
        handleClose()
      } else {
        const response = await fetch('http://localhost:8000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile, username, password })
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.detail || 'Signup failed')
        signIn(data.access_token, data.user)
        handleClose()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle closing properly and reset form
  const handleClose = () => {
    setError(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-card text-card-foreground shadow-xl rounded-2xl overflow-hidden pointer-events-auto border"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <div className="bg-primary text-primary-foreground p-1 rounded-lg">
                      <Map className="h-5 w-5" />
                    </div>
                    CITYVERSE
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleClose} className="rounded-full">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {isLogin ? 'Welcome back' : 'Create an account'}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {isLogin 
                      ? 'Enter your credentials to access your account' 
                      : 'Join us using your mobile number'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="pl-10 rounded-xl"
                        placeholder="e.g. 9876543210"
                      />
                    </div>
                  </div>
                  
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="pl-10 rounded-xl"
                          placeholder="johndoe"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Password</label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 rounded-xl"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full rounded-xl h-11" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      isLogin ? 'Sign In' : 'Sign Up'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin)
                      setError(null)
                    }} 
                    className="text-primary font-semibold hover:underline"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
