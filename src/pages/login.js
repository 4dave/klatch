import React from "react"
import { useAuth } from "../context/Auth"
import { app } from "../firebase"

const Login = () => {
  const { login, logout } = useAuth(app)
  return (
    <>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </>
  )
}

export default Login
