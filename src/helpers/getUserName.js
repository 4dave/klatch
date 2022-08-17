import React from "react"
import { useRouter } from "next/router"

const GetUserName = ({ setUserName }) => {
  const router = useRouter()

  const SetUser = (e) => {
    setUserName(e.target.value)
  }

  return (
    <div>
      <h1>Welcome! What's your first and last name?</h1>
      <input type="text" />
      <button onClick={(e) => SetUser(e)}>Submit</button>
    </div>
  )
}

export default GetUserName
