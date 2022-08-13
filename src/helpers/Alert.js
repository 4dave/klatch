import React from "react"

function Alert({ type, message }) {
  switch (type) {
    case "success":
      return (
        <div className="alert alert-success" role="alert">
          <i class="fa fa-check"></i>
          <strong>{message}</strong>
        </div>
      )
    case "error":
      return (
        <div className="alert alert-error" role="alert">
          <i class="fa fa-times-circle"></i>
          <strong>{message}</strong>
        </div>
      )
    case "warning":
      return (
        <div className="alert alert-warning" role="alert">
          <i class="fa fa-warning"></i>
          <strong>{message}</strong>
        </div>
      )
    case "info":
      return (
        <div className="alert alert-info" role="alert">
          <i class="fa fa-info-circle"></i>
          <strong>{message}</strong>
        </div>
      )
    default:
      return null
  }
}

export default Alert
