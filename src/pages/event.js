import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { db } from "../firebase"
import { onSnapshot, doc, updateDoc } from "firebase/firestore"
import { Button } from "@mui/material"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

const Event = () => {
  const { query } = useRouter()
  const eventid = Object.keys(query)[0]
  const [event, setEvent] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [formFields, setFormFields] = useState({
    name: "",
    rsvp: "",
    comment: "",
    rsvpDate: "",
  })

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

  const setFields = (e) => {
    const value = e.target.value
    setFormFields({
      ...formFields,
      [e.target.name]: value,
      rsvpDate: new Date().toISOString(),
    })
  }

  const addRSVP = async () => {
    const eventRef = doc(db, "event", eventid)
    await updateDoc(eventRef, {
      guests: [...event.guests, formFields],
    })
    setFormFields({
      name: "",
      rsvp: "",
      comment: "",
      rsvpDate: "",
    })
  }

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

        <hr />
        <div className="w-28 pt-4">
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
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>RSVP</InputLabel>
                <Select
                  value={formFields.rsvp}
                  label="RSVP"
                  onChange={setFields}
                  name="rsvp"
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                  <MenuItem value={"Maybe"}>Maybe</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={setFields}
                value={formFields.name}
              />
              <TextField
                id="comment"
                name="comment"
                label="Comment"
                variant="outlined"
                onChange={setFields}
                value={formFields.comment}
              />
            </Box>
            <Button variant="outlined" size="small" onClick={() => addRSVP()}>
              Add
            </Button>
          </FormControl>
        </div>
        <div className="text-2xl my-2">Guests: </div>
        <div className="bg-red-300 mt-2 list-none">
          {event?.guests?.map((guest, index) => (
            <li key={index}>
              <div className="font-bold">{guest.name}</div>
              <div>RSVP: {guest.rsvp}</div>
              <div>Comment: {guest.comment}</div>
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Event
