import React, { useState } from "react"

export default function CopyURL() {
  const [copied, setCopied] = useState(false)

  function copy() {
    const el = document.createElement("input")
    el.value = window.location.href
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
    setCopied(true)
  }

  return (
    <div className="text-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={copy}
      >
        {!copied ? "Copy URL" : "Copied!"}
      </button>
    </div>
  )
}
