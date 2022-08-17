import React, { useState } from "react"

const Test = () => {
  const [age, setAge] = useState("")

  return (
    <>
      <h1>TESTING</h1>
      <p>{age}</p>
      <input
        type="text"
        id="test"
        placeholder="TESTING"
        onChange={(e) => {
          setAge(e.target.value)
        }}
      />
    </>
  )
}
export default Test
