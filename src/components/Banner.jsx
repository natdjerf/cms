import React from "react"
import Tripadvisor from "../images/tripadvisor.inline.svg"
import Facebook from "../images/facebook.inline.svg"

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
