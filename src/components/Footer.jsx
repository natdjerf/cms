import React from "react"
import Tripadvisor from "../images/tripadvisor.inline.svg"
import Facebook from "../images/facebook.inline.svg"

const Footer = ({ data }) => {
  const { phone = "", email, address_line_1, address_line_2 } = data
  return (
    <div className="background grid paddingTop60 paddingBottom60 alignCenter textCenter textLeftMedia ">
      <div className="firstQuarter">
        <h4 className="h4">Contact</h4>
        <address className="normal">
          <p>{address_line_1}</p>
          <p>{address_line_2}</p>
        </address>
      </div>
      <div className="secondQuarter">
        <h4 className="h4">Visit</h4>
        <a className="block primary" href={`mailto:${email}`}>
          {email}
        </a>
        <a className="block primary" href={`tel:${phone.replace("-", "")}`}>
          {phone}
        </a>
      </div>
      <div className="thirdQuarter">
        <h4>Jobs</h4>
        <a
          className="primary"
          target="_blank"
          rel="noopener noreferrer"
          href="https://tonysclamshop.com/data/employment_application.pdf"
        >
          Application
        </a>
      </div>
      <div className="fourthQuarter">
        <div className="smallGrid">
          <a
            aria-label="Tripadvisor reviews"
            className="primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tripadvisor.com/Restaurant_Review-g60710-d1208586-Reviews-Tony_s_Clam_Shop-Quincy_Massachusetts.html"
          >
            <Tripadvisor />
          </a>

          <a
            aria-label="Facebook profile"
            className="primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/Tonys-Clam-Shop-120180677994652/"
          >
            <Facebook />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
