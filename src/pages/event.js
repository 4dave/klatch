import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { db } from "../firebase"
import { onSnapshot, doc, updateDoc, Timestamp } from "firebase/firestore"
import { BsCalendarDate } from "react-icons/bs"
import { MdOutlineLocationOn } from "react-icons/md"
import { BsPersonCheck } from "react-icons/bs"
import { BsPersonX } from "react-icons/bs"
import { BsPersonDash } from "react-icons/bs"
import { BiUserVoice } from "react-icons/bi"
import Alert from "../helpers/Alert"
import CopyURL from "../helpers/CopyURL"

const Event = () => {
  const { query } = useRouter()
  const eventid = Object.keys(query)[0]
  const [localName, setLocalName] = useState("")
  const [event, setEvent] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [formFields, setFormFields] = useState({
    name: "",
    rsvp: "",
    comment: "",
    rsvpDate: "",
  })

  const setLocalStorage = (name) => {
    setLocalName(name)
    localStorage.setItem("klatch-user", JSON.stringify(name))
  }

  // maybe append the eventID to the localstorage key?
  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("klatch-user"))
    if (localName === "" && username) {
      setLocalName(username)
    }
  }, [])

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
      // rsvpDate: new Date().toISOString(),
      rsvpDate: Timestamp.fromDate(new Date()),
    })
  }

  const addRSVP = async () => {
    setLocalStorage(formFields.name)
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

  const hasComments = () => {
    if (event.guests?.some((guest) => guest.comment.length > 0)) {
      return true
    } else {
      return false
    }
  }

  return deleted ? (
    <>
      <div className="w-screen p-4" />
      <div className="flex flex-col md:flex-row gap-2 justify-center" />
      <Alert type="error" message="Event not found" />
    </>
  ) : (
    // body layout
    <div className="w-screen p-4">
      {/* flex columns */}
      <div className="flex flex-col gap-2 justify-center md:w-[37rem] mx-auto">
        {/* welcome message */}
        {/* ################################################################## */}
        <Alert type="info" message={`Welcome to Klatch, ${localName}!`} />
        {/* ################################################################## */}

        <div className="p-4 border border-slate-400 rounded-md bg-violet-200 shadow-lg">
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
              {event.description}
            </div>
            <div className="flex flex-row items-center gap-2 flex-grow">
              <MdOutlineLocationOn className="text-2xl" />
              <a href="https://goo.gl/maps/PsJuYMBVc52k1sdE8" target="blank">
                {event.location}
              </a>
            </div>
          </div>
        </div>
        {/* ################################################################## */}
        {/* guests container */}
        <div className="p-4 border border-slate-400 rounded-md bg-violet-200 shadow-lg">
          {/* guests list  */}
          <div className="flex flex-col gap-2">
            <span className="text-2xl mb-4">GUESTS</span>
            {event.guests?.length == 0 ? (
              <div className="flex flex-row items-center gap-2">
                <pre className="italic text-sm">No guests yet</pre>
              </div>
            ) : (
              event.guests?.map((guest, index) => (
                <div key={index} className="flex flex-row gap-2 items-center">
                  <span>{rsvpStatus(guest.rsvp)}</span>
                  <span className="font-medium">{guest.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
        {/* )} */}
        {/* ################################################################## */}
        {/* comments container */}
        <div className="p-4 border border-slate-400 rounded-md bg-violet-200 shadow-lg">
          {/* comments div */}
          <div className="flex flex-col gap-2">
            {/* comments text */}
            <div className="flex flex-col gap-2">
              <span className="text-2xl mb-4">COMMENTS</span>
              {!hasComments() ? (
                <div className="flex flex-row items-center gap-2">
                  <pre className="italic text-sm">No comments yet</pre>
                </div>
              ) : (
                event.guests?.map((guest, index) => {
                  if (guest.comment.length > 0) {
                    return (
                      <div className="flex flex-col flex-wrap" key={index}>
                        <span className="flex items-center font-medium gap-2">
                          <BiUserVoice size={25} className="text-violet-800" />{" "}
                          {guest.name}{" "}
                          <span className="text-xs text-slate-500">
                            {new Date(
                              guest.rsvpDate.seconds * 1000
                            ).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </span>
                        </span>
                        <span className="italic">{guest.comment}</span>
                      </div>
                    )
                  }
                })
              )}
            </div>
          </div>
        </div>
        {/* ################################################################## */}
        {/* rsvp form */}
        <div className="p-4 border border-slate-400 rounded-md bg-violet-200 shadow-lg">
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
                  autoComplete="off"
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
                  autoComplete="off"
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

        {/* testing container */}
        <div className="p-4 border border-slate-400 rounded-md bg-violet-200 shadow-lg">
          <div className="flex flex-col gap-2">
            <span className="text-2xl mb-4">TESTING</span>
            <div className="flex flex-row items-center gap-2">
              <CopyURL />
            </div>
          </div>
        </div>
        {/* ################################################################## */}
      </div>
    </div>
  )
}

export default Event
