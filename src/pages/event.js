import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { db } from "../firebase"
import { onSnapshot, doc, updateDoc } from "firebase/firestore"
import { BsCalendarDate } from "react-icons/bs"
import { MdOutlineLocationOn } from "react-icons/md"
import { BsPersonCheck } from "react-icons/bs"
import { BsPersonX } from "react-icons/bs"
import { BiUserVoice } from "react-icons/bi"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"

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
    // body layout
    <div className="w-screen p-4">
      {/* flex columns */}
      <div className="flex flex-col md:flex-row gap-2 justify-center">
        {/* ################################################################## */}
        {/* event card */}

        <div className="p-4 border border-slate-400 bg-violet-100 shadow-lg">
          {/* event data divs */}
          <div className="flex flex-col gap-2">
            <span className="text-2xl mb-4">EVENT</span>
            <div className="flex flex-row items-center gap-2">
              <BsCalendarDate />
              {event.date?.toDate().toLocaleDateString("en-US")}
            </div>
            <div className="flex flex-row items-center gap-2 text-4xl">
              {event.name}
            </div>
            <div className="flex flex-row items-center gap-2 flex-grow">
              <BsCalendarDate />
              {event.description}
            </div>
            <div className="flex flex-row items-center gap-2 flex-grow">
              <MdOutlineLocationOn />
              <a href="https://goo.gl/maps/PsJuYMBVc52k1sdE8" target="blank">
                {event.location}
              </a>
            </div>
          </div>
        </div>

        {/* ################################################################## */}

        {event.guests?.length > 0 && (
          <div className="p-4 border border-slate-400 bg-violet-100 shadow-lg">
            {/* guests + comments  */}
            <div className="flex flex-col gap-2">
              <span className="text-2xl mb-4">GUESTS</span>
              {event.guests.map((guest, index) => (
                <div key={index} className="flex flex-row gap-2 items-center">
                  <span>
                    {guest.rsvp === "Yes" ? (
                      <BsPersonCheck className="text-green-500 text-2xl" />
                    ) : (
                      <BsPersonX className="text-red-500 text-2xl" />
                    )}
                  </span>
                  <span className="font-medium">{guest.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* ################################################################## */}
        {/* rsvp form */}
        <div className="p-4 border border-slate-400 bg-violet-100 shadow-lg">
          {/* rsvp form divs */}
          <div className="flex flex-col gap-2">
            {/* rsvp form input gaps */}
            <div className="flex flex-col gap-2">
              <span className="text-2xl mb-4">RSVP</span>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">RSVP</InputLabel>
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

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
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
                    placeholder="say something nice"
                  />
                </Box>
              </FormControl>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => addRSVP()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* ################################################################## */}

        {/* ################################################################## */}
        {/* rsvp form */}
        <div className="p-4 border border-slate-400 bg-violet-100 shadow-lg">
          {/* rsvp form divs */}
          <div className="flex flex-col gap-2">
            {/* rsvp form input gaps */}
            <div className="flex flex-col gap-2">
              <span className="text-2xl mb-4">COMMENTS</span>
              {event.guests?.map((guest, index) => (
                <li
                  key={index}
                  className="flex flex-row items-center gap-2 list-none italic text-slate-700"
                >
                  <BiUserVoice className="text-violet-800 text-2xl" />{" "}
                  {guest.comment} --
                  {guest.name}
                </li>
              ))}
            </div>
          </div>
        </div>

        {/* ################################################################## */}
      </div>
    </div>
  )
}

export default Event
