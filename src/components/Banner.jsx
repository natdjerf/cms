import React from "react"

const Banner = ({ data }) => {
  const { message } = data
  return (
    <div className="">
      <div className="flex backgroundSecondary justifyCenter paddingBanner">
        <h5 className="h5Body">{message}</h5>
      </div>
    </div>
  )
}

export default Banner
