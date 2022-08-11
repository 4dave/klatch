import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { db } from "../firebase"
import {
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  orderBy,
  setDoc,
  Timestamp,
} from "firebase/firestore"
import Link from "next/link"
import { MdOutlineDeleteOutline } from "react-icons/md"

const Events = () => {
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    location: "",
  })

  useEffect(() => {
    const q = query(collection(db, "event"), orderBy("date", "desc"))
    setLoading(true)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let items = []
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id })
      })
      setEvents(items)
    })
    setLoading(false)
    return () => unsubscribe()
  }, [])

  const setFields = (e) => {
    const value = e.target.value
    setFormFields({
      ...formFields,
      [e.target.name]: value,
    })
  }

  const createEvent = async () => {
    // await addDoc(collection(db, "event"), {  // this works and firestore creates an id
    // using doc() can set id
    const rsvpDate = Timestamp.fromDate(new Date(date))
    await setDoc(doc(db, "event", nanoid(8)), {
      ...formFields,
      date: rsvpDate,
      guests: [],
    })
    setFormFields({
      name: "",
      description: "",
      location: "",
    })
    setDate("")
  }

  const deleteEvent = async (id) => {
    await deleteDoc(doc(db, "event", id))
  }

  return (
    <div className="w-screen p-4">
      <div className="flex flex-col md:flex-row gap-2 justify-center">
        {/* first col */}
        <div className="flex flex-col items-center">
          <div className="p-4 border border-slate-400 rounded-md bg-violet-100 shadow-lg">
            {/* SHOW EVENT LIST */}

            {/*  date | name | description | location */}

            {/* ########################################################################### */}
            <div className="flex flex-col gap-2">
              <span className="text-4xl text-slate-700">Event List</span>
              {events.map((event) => (
                <li className="py-2 list-none" key={event.id}>
                  <Link href={`/event?${event.id}`}>
                    <a>{event.name}</a>
                  </Link>{" "}
                  -{" "}
                  {new Date(event.date.seconds * 1000).toLocaleDateString(
                    "en-US"
                  )}
                  <div className="flex flex-col">
                    <span className="italic text-slate-500">
                      {event.description}
                      <span className="text-violet-400">
                        &nbsp; &nbsp; [{event.guests.length} guests]
                      </span>
                    </span>
                    <button
                      className="hover:text-red-500 text-red-400 flex items-center"
                      onClick={() => deleteEvent(event.id)}
                    >
                      <MdOutlineDeleteOutline className="flex" /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>

        {/* CREATE NEW EVENT */}
        <div className="flex flex-col items-center">
          <div className="p-4 border border-slate-400 rounded-md bg-violet-100 shadow-lg min-w-full">
            <div className="flex flex-col gap-2">
              <span className="text-4xl text-slate-700">Add Event</span>
              <div className="form__group">
                <input
                  type="name"
                  id="name"
                  className="form__field"
                  placeholder="name"
                  name="name"
                  onChange={setFields}
                  value={formFields.name}
                  autoComplete="off"
                />
                <label htmlFor="email" className="form__label">
                  Name
                </label>
              </div>
              <div className="form__group">
                <input
                  type="description"
                  id="description"
                  className="form__field"
                  placeholder="description"
                  name="description"
                  onChange={setFields}
                  value={formFields.description}
                  autoComplete="off"
                />
                <label htmlFor="email" className="form__label">
                  Description
                </label>
              </div>
              <div className="form__group">
                <input
                  type="location"
                  id="location"
                  className="form__field"
                  placeholder="location"
                  name="location"
                  onChange={setFields}
                  value={formFields.location}
                  autoComplete="off"
                />
                <label htmlFor="email" className="form__label">
                  Location
                </label>
              </div>
              <div className="form__group">
                <input
                  type="datetime-local"
                  id="date"
                  className="form__field"
                  placeholder="Date"
                  name="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                  }}
                />
                <label htmlFor="date" className="form__label">
                  Date
                </label>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => createEvent()}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events
