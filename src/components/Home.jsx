import React from "react"
import { Link } from "gatsby"
import Shrimp from "../images/shrimp.inline.svg"
import Fries from "../images/fries.inline.svg"
import Burger from "../images/burger.inline.svg"
import Cutlery from "../images/cutlery.inline.svg"
import Beer from "../images/beer.inline.svg"
import Soda from "../images/soda.inline.svg"

const Home = ({ data }) => {
  const {
    hours,
    hours_description,
    phone = "",
    email,
    address_line_1,
    address_line_2,
    section_favorites_header,
    section_welcome_header,
    section_welcome_text,
    section_food_header,
    section_food_text,
    section_family_header,
    section_family_text,
    section_favorites_seafood,
    section_favorites_griddle,
    section_favorites_beverages,
    welcome_image_about_url,
    welcome_image_about_description,
    welcome_image_food_url,
    welcome_image_food_description,
    family_image_1_url,
    family_image_1_description,
    family_image_2_url,
    family_image_2_description,
    family_image_3_url,
    family_image_3_description,
  } = data
  return (
    <>
      <section className="section landing fullvW">
        <div className="flex justifyCenter paddingTop80m30d">
          <h1 className="h1 textCenter">Tony's Clam Shop</h1>
        </div>
      </section>
      <section className="section paddingTop120 paddingBottom120 width100">
        <div className="grid textCenter">
          <div className="leftThird">
            <h3 className="h3">Hours</h3>
            <p>{hours_description}</p>
            <p>{hours}</p>
          </div>
          <div className="centerThird">
            <h3 className="h3">Location</h3>
            <address className="normal">
              <p>{address_line_1}</p>
              <p>{address_line_2}</p>
            </address>
          </div>
          <div className="rightThird">
            <h3 className="h3">Contact</h3>
            <a className="block primary" href={`mailto:${email}`}>
              {email}
            </a>
            <a className="block primary" href={`tel:${phone.replace("-", "")}`}>
              {phone}
            </a>
          </div>
        </div>
      </section>
      <section className="section paddingTop60 background">
        <div className="grid alignCenter textCenter textLeftMedia">
          <div className="leftHalf orderMedia">
            <picture>
              <source
                media="(min-width: 200px)"
                srcSet={welcome_image_about_url}
              />
              <img
                className="polaroidImage"
                src={welcome_image_about_url}
                alt={welcome_image_about_description}
              ></img>
            </picture>
          </div>
          <div className="rightHalfCenter">
            <h2 className="h2">{section_welcome_header}</h2>
            <p className="paddingTop30">{section_welcome_text}</p>
          </div>
        </div>
      </section>
      <section className="section paddingTop60 paddingBottom60 background">
        <div className="grid alignCenter textCenter textLeftMedia">
          <div className="leftHalfCenter">
            <h2 className="h2">{section_food_header}</h2>
            <p className="paddingTop30">{section_food_text}</p>
          </div>
          <div className="rightHalf">
            <picture>
              <source
                media="(min-width: 200px)"
                srcSet={welcome_image_food_url}
              />
              <img
                className="polaroidImage"
                src={welcome_image_food_url}
                alt={welcome_image_food_description}
              ></img>
            </picture>
          </div>
        </div>
      </section>
      <section className="section paddingTop60 textCenter">
        <div className="grid smallGap">
          <h2 className="h2 fullWidth paddingTop40">
            {section_favorites_header}
          </h2>
          <div className="leftThird">
            <div className="flex justifyCenter paddingTop60">
              <Shrimp role="presentation" alt="" />
              <Fries role="presentation" alt="" className="marginIcon" />
            </div>
            <p className="paddingTop30">{section_favorites_seafood}</p>
          </div>
          <div className="centerThird">
            <div className="flex justifyCenter paddingTop60">
              <Burger role="presentation" alt="" className="marginIcon" />
              <Cutlery role="presentation" alt="" />
            </div>
            <p className="paddingTop30">{section_favorites_griddle}</p>
          </div>
          <div className="rightThird">
            <div className="flex justifyCenter paddingTop60">
              <Beer role="presentation" alt="" />
              <Soda role="presentation" alt="" className="marginIcon" />
            </div>
            <p className="paddingTop30">{section_favorites_beverages}</p>
          </div>
          <div className="fullWidth textCenter extraBold upperCase paddingTop30">
            <Link className="link primaryColor" to="/menu/">
              View Menu
            </Link>
          </div>
        </div>
      </section>
      <section className="section paddingTop60 paddingBottom40">
        <div className="grid alignCenter">
          <h2 className="h2 fullWidth textCenter paddingTop40">
            {section_family_header}
          </h2>
          <div className="leftHalf">
            <picture>
              <source media="(min-width: 100px)" srcSet={family_image_1_url} />
              <img
                className="galleryImage"
                src={family_image_1_url}
                alt={family_image_1_description}
              ></img>
            </picture>
          </div>
          <div className="rightHalf">
            <picture>
              <source media="(min-width: 200px)" srcSet={family_image_2_url} />
              <img
                className="galleryImage"
                src={family_image_2_url}
                alt={family_image_2_description}
              ></img>
            </picture>
          </div>
          <div className="leftHalf">
            <picture>
              <source media="(min-width: 100px)" srcSet={family_image_3_url} />
              <img
                className="galleryImage galleryPosition"
                src={family_image_3_url}
                alt={family_image_3_description}
              ></img>
            </picture>
          </div>
          <p className="rightHalf textCenter textLeftMedia">
            {section_family_text}
          </p>
        </div>
      </section>
    </>
  )
}

export default Home
