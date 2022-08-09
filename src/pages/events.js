import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
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
import { Button, FormControl } from "@mui/material"
import Link from "next/link"

const Events = () => {
  const [date, setDate] = useState(null)
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
    setDate(null)
  }

  const deleteEvent = async (id) => {
    await deleteDoc(doc(db, "event", id))
  }

  return (
    <div className="w-screen p-4">
      <div className="flex flex-col md:flex-row gap-2 justify-center">
        <div className="flex flex-col items-center">
          <div className="p-4 border border-slate-400 rounded-md bg-violet-100 shadow-lg min-w-full">
            <div className="flex flex-col gap-2">
              <span className="text-4xl text-slate-700">Add Event</span>
              <FormControl fullWidth>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "auto" },
                  }}
                  noValidate
                  autoComplete="off"
                  className="flex flex-col"
                >
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="standard"
                    onChange={setFields}
                    value={formFields.name}
                  />
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="standard"
                    onChange={setFields}
                    value={formFields.description}
                  />
                  <TextField
                    id="location"
                    name="location"
                    label="Location"
                    variant="standard"
                    onChange={setFields}
                    value={formFields.location}
                  />
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      id="date"
                      name="date"
                      label="Date"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                      )}
                    />
                  </LocalizationProvider> */}

                  {/*  */}

                  <div className="form__group">
                    <input
                      type="datetime-local"
                      id="date"
                      className="form__field"
                      placeholder="Date"
                      name="date"
                      onChange={(e) => {
                        setDate(e.target.value)
                      }}

                      // value={date}
                      // e.target.value = "2022-08-10T11:47"
                    />
                    <label htmlFor="date" className="form__label">
                      Date
                    </label>
                  </div>

                  {/*  */}
                </Box>
                <Button
                  variant="standard"
                  size="medium"
                  onClick={() => createEvent()}
                >
                  Create Event
                </Button>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 border border-slate-400 rounded-md bg-violet-100 shadow-lg">
            <div className="flex flex-col gap-2">
              <span className="text-4xl text-slate-700">Event List</span>
              {events.map((event) => (
                <li className="py-2 text-2xl" key={event.id}>
                  <Link href={`/event?${event.id}`}>
                    <a>{event.name}</a>
                  </Link>
                  <div>
                    <span className="mx-3">{event.description}</span>
                    <span className="mx-3">
                      {new Date(event.date.seconds * 1000).toLocaleDateString(
                        "en-US"
                      )}
                    </span>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => deleteEvent(event.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events
