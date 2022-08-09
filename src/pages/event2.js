import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { db } from "../firebase"
import { onSnapshot, doc, updateDoc } from "firebase/firestore"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { MdOutlineDescription } from "react-icons/md"
import { GoLocation } from "react-icons/go"
import { BsCalendarDate } from "react-icons/bs"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const Event2 = () => {
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

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          sdfasdfasdfasfa
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  )

  return (
    <div className="m-4 bg-slate-600">
      <div className="flex flex-col md:flex-row">
        <div>
          <Box>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">{card}</Card>
            </Box>
          </Box>
        </div>
        <div>
          <Box>
            <GoLocation />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
            maiores vitae ab placeat ex ipsam fuga omnis nobis eos quibusdam
            unde nam iusto ea ipsa aperiam, enim aspernatur similique temporibus
            officia voluptatibus adipisci? Eius ab repudiandae fugit aspernatur.
            Ipsam ad facere aliquid a ullam sit obcaecati nemo accusantium
            libero nihil.
          </Box>
        </div>
        <div>
          <Box>
            <BsCalendarDate />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
            maiores vitae ab placeat ex ipsam fuga omnis nobis eos quibusdam
            unde nam iusto ea ipsa aperiam, enim aspernatur similique temporibus
            officia voluptatibus adipisci? Eius ab repudiandae fugit aspernatur.
            Ipsam ad facere aliquid a ullam sit obcaecati nemo accusantium
            libero nihil.
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Event2
