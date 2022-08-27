import React, { useEffect, useState } from "react"
import { useAuth } from "../context/Auth"
import { app } from "../firebase"

const Test = () => {
  const [deleted, setDeleted] = useState(false)
  const { user, login, logout } = useAuth(app)

  useEffect(() => {
    // setDeleted(true)
    console.log("testing...")
  }, [])

  // if deleted is true, render the deleted message, else render the rest of the page
  return (
    <>
      <h1>TESTING</h1>
      <p>
        this is a test Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quidem excepturi aliquam maxime laborum officia aut, explicabo animi
        amet sequi iusto, cum rem nulla! Officia molestiae, sequi delectus
      </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </>
  )
}
export default Test
