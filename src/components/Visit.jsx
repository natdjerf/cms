import React from "react"

const Visit = ({ data }) => {
  const {
    hours,
    hours_description,
    phone = "",
    email,
    address_line_1,
    address_line_2,
  } = data

  return (
    <>
      <h1 className="h1">Visit</h1>
      <address className="normal">
        <p>{address_line_1}</p>
        <p>{address_line_2}</p>
      </address>
    </>
  )
}

export default Visit
