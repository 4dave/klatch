import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import { app } from "../firebase"

const auth = getAuth(app)

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const login = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (error) {
      console.log(error)
    } finally {
      router.push("/events")
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
