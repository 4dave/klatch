import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { db } from "../firebase"
import { onSnapshot, doc } from "firebase/firestore"

const Event = () => {
  const { query } = useRouter()
  const eventid = Object.keys(query)[0]
  const [event, setEvent] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const getEvent = async () => {
    setLoading(true)
    const unsub = onSnapshot(doc(db, "event", eventid), (doc) => {
      if (doc.exists()) {
        setEvent(doc.data())
      } else {
        setDeleted(true)
      }
    })
    setLoading(false)
    return unsub
  }

  useEffect(() => {
    eventid && getEvent()
  }, [eventid])

  console.log(event)

  return (
    <div className="container flex flex-col mx-auto border bg-red-400 h-screen w-screen p-4">
      <div>
        {deleted && <p>Event not found</p>}
        {loading && <p>Loading...</p>}
        <h1 className="text-4xl font-bold text-center">{event.name}</h1>
      </div>
      <div>
        <p>Description: {event.description}</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.date?.toDate().toLocaleDateString("en-US")}</p>
        <p>
          Guests: <br />
        </p>
        {event?.guests?.map((guest, index) => (
          <li key={index}>
            <div>Name: {guest.name}</div>
            <div>RSVP: {guest.rsvp}</div>
            <div>Comment: {guest.comment}</div>
          </li>
        ))}
      </div>
    </div>
  )
}

export default Event
