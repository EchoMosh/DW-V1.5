import { useState, useEffect } from "react"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"

export function AuthContainer() {
  const [isSignup, setIsSignup] = useState(false)

  useEffect(() => {
    const handleShowSignup = () => setIsSignup(true)
    const handleShowLogin = () => setIsSignup(false)

    window.addEventListener('showSignup', handleShowSignup)
    window.addEventListener('showLogin', handleShowLogin)

    return () => {
      window.removeEventListener('showSignup', handleShowSignup)
      window.removeEventListener('showLogin', handleShowLogin)
    }
  }, [])

  return (
    <>
      {isSignup ? (
        <SignupForm onBackToLogin={() => setIsSignup(false)} />
      ) : (
        <LoginForm />
      )}
    </>
  )
}
