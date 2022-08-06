import React, { useEffect } from "react"
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
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore"
import { Button, FormControl } from "@mui/material"
import Link from "next/link"

const Events = () => {
  const [date, setDate] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [events, setEvents] = React.useState([])
  const [event, setEvent] = React.useState({})
  const klatch = nanoid(8)

  useEffect(() => {
    const q = query(collection(db, "event"), orderBy("date", "desc"))
    // const q = query(collection(db, "event"))
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
    setEvent({
      ...event,
      [e.target.name]: value,
    })
  }

  const createEvent = async () => {
    await addDoc(collection(db, "event"), {
      ...event,
      klatch: klatch,
      date: date,
    })
    // setEvents({})
  }

  const deleteEvent = async (id) => {
    await deleteDoc(doc(db, "event", id))
  }

  return (
    <>
      <h1 className="container w-full mx-2 text-3xl py-2 mb-2">Events</h1>
      <div className="flex flex-1">
        <div className="w-64 mx-4">
          <FormControl fullWidth>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              className="flex flex-col"
            >
              {/* <TextField
              disabled
              id={klatch}
              name="klatch"
              label="event id"
              variant="outlined"
              defaultValue=""
            /> */}
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={setFields}
              />
              <TextField
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={setFields}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  id="date"
                  name="date"
                  label="Date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                id="location"
                name="location"
                label="Location"
                variant="outlined"
                onChange={setFields}
              />
            </Box>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => createEvent()}
            >
              Create Event
            </Button>
          </FormControl>
        </div>

        <div className="bg-slate-200 p-4">
          {events.map((event) => (
            <li className="py-2" key={event.id}>
              <Link href={`/event?${event.klatch}`}>
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
    </>
  )
}

export default Events
