import React from "react"
import { useRouter } from "next/router"

const Event = () => {
  const { query } = useRouter()
  const name = Object.keys(query)[0]

  return (
    <>
      <div>Event</div>
      <p>{name}</p>
    </>
  )
}

export default Event
