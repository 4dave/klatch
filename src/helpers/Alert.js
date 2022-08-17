import React from "react"
import { BsInfoCircle, BsCheckCircle } from "react-icons/bs"
import { BiError } from "react-icons/bi"
import { AiOutlineWarning } from "react-icons/ai"

function Alert({ type, message }) {
  switch (type) {
    case "success":
      return (
        <div
          className="flex justify-center items-center gap-2 font-bold alert alert-success"
          role="alert"
        >
          <BsCheckCircle />
          <span>{message}</span>
        </div>
      )
    case "error":
      return (
        <div
          className="flex justify-center items-center gap-2 font-bold alert alert-error"
          role="alert"
        >
          <BiError />
          <span>{message}</span>
        </div>
      )
    case "warning":
      return (
        <div
          className="flex justify-center items-center gap-2 font-bold alert alert-warning"
          role="alert"
        >
          <AiOutlineWarning />
          <span>{message}</span>
        </div>
      )
    case "info":
      return (
        <div
          className="flex justify-center items-center gap-2 font-bold alert alert-info"
          role="alert"
        >
          <BsInfoCircle />
          <span>{message}</span>
        </div>
      )
    default:
      return null
  }
}

export default Alert
