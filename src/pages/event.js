import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { db } from "../firebase"
import { onSnapshot, doc, updateDoc } from "firebase/firestore"
import { BsCalendarDate } from "react-icons/bs"
import { MdOutlineLocationOn } from "react-icons/md"
import { BsPersonCheck } from "react-icons/bs"
import { BsPersonX } from "react-icons/bs"
import { BsPersonDash } from "react-icons/bs"
import { BiUserVoice } from "react-icons/bi"
import { GrDocumentText } from "react-icons/gr"

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

  const rsvpStatus = (rsvp) => {
    switch (rsvp) {
      case "Yes":
        return <BsPersonCheck className="text-green-500 text-2xl" />
      case "No":
        return <BsPersonX className="text-red-500 text-2xl" />
      case "Maybe":
        return <BsPersonDash className="text-slate-500 text-2xl" />
      default:
        return <BsPersonDash className="text-slate-500 text-2xl" />
    }
  }

  return (
    // body layout
    <div className="w-screen p-4">
      {/* flex columns */}
      <div className="flex flex-col md:flex-row gap-2 justify-center">
        {/* ################################################################## */}
        {/* event card */}

        <div className="p-4 border border-slate-400 rounded-md bg-violet-100 shadow-lg">
          {/* event data divs */}
          <div className="flex flex-col gap-2">
            <span className="text-2xl mb-4">EVENT</span>
            <div className="flex flex-row items-center gap-2">
              <BsCalendarDate />
              {event.date?.toDate().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
            <div className="flex flex-row items-center gap-2 text-4xl">
              {event.name}
            </div>
            <div className="flex flex-row items-center gap-2 flex-grow">
              <GrDocumentText />
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
        {/* guests container */}
        {event.guests?.length > 0 && (
          <div className="p-4 border border-slate-400 rounded-md bg-violet-100 shadow-lg">
            {/* guests list  */}
            <div className="flex flex-col gap-2">
              <span className="text-2xl mb-4">GUESTS</span>
              {event.guests.map((guest, index) => (
                <div key={index} className="flex flex-row gap-2 items-center">
                  <span>{rsvpStatus(guest.rsvp)}</span>
                  <span className="font-medium">{guest.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* ################################################################## */}
        {/* comments container */}
        <div className="p-4 border border-slate-400 rounded-md bg-violet-100 shadow-lg">
          {/* comments div */}
          <div className="flex flex-col gap-2">
            {/* comments text */}
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
        {/* rsvp form */}
        <div className="p-4 border border-slate-400 rounded-md bg-violet-100 shadow-lg">
          {/* rsvp form divs */}
          <div className="flex flex-col gap-2">
            {/* rsvp form input gaps */}
            <div className="flex flex-col gap-2">
              <span className="text-2xl mb-4">RSVP</span>

              <div className="form__group">
                <label htmlFor="rsvp">RSVP</label>
                <select
                  id="rsvp"
                  name="rsvp"
                  className="form__field"
                  placeholder="RSVP"
                  onChange={setFields}
                  value={formFields.rsvp}
                >
                  <option style={{ display: "none" }} />
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Maybe">Maybe</option>
                </select>
              </div>

              <div className="form__group">
                <input
                  type="name"
                  id="name"
                  className="form__field"
                  placeholder="Your Email"
                  name="name"
                  onChange={setFields}
                  value={formFields.name}
                />
                <label htmlFor="email" className="form__label">
                  Name
                </label>
              </div>

              <div className="form__group">
                <textarea
                  id="comment"
                  className="form__field"
                  placeholder="Your Message"
                  rows="6"
                  name="comment"
                  onChange={setFields}
                  value={formFields.comment}
                ></textarea>
                <label htmlFor="comment" className="form__label">
                  Comment
                </label>
              </div>
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
      </div>
    </div>
  )
}

export default Event
