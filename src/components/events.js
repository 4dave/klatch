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

const Events = () => {
  const [date, setDate] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [events, setEvents] = React.useState([])
  const [event, setEvent] = React.useState({})
  const klatch = nanoid(8)

  useEffect(() => {
    // const q = query(collection(db, "event"), orderBy("name", "desc"))
    const q = query(collection(db, "event"))
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
    console.log(date)
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
    })
    setEvent({})
  }

  const deleteEvent = async (id) => {
    await deleteDoc(doc(db, "event", id))
  }

  return (
    <>
      <h1 className="container w-full mx-2 text-3xl py-2 mb-2">Events</h1>
      <div className="flex flex-1">
        <div>
          {events.map((event) => (
            <>
              <div key={event.id}>
                <p>{event.name}</p>
                <pre>{event.description}</pre>
              </div>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </>
          ))}
        </div>

        <div className="w-96">
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
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            </LocalizationProvider> */}
              <TextField
                id="location"
                name="location"
                label="Location"
                variant="outlined"
                onChange={setFields}
              />
            </Box>
            <Button onClick={() => createEvent()}>Create Event</Button>
          </FormControl>
        </div>
      </div>
    </>
  )
}

export default Events
