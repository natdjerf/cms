import * as React from "react"
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
  } = data
  return (
    <>
      <section className="section landing fullvW">
        <div className="flex justifyCenter paddingTopHeader">
          <h1 className="h1">Tony's Clam Shop</h1>
        </div>
      </section>
      <section className="section paddingSectionLarge">
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
      <section className="section paddingSection background">
        <div className="grid alignCenter">
          <div className="leftHalf">
            <picture>
              <source
                media="(min-width: 200px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/welcome_crop_yicrh1.png"
              />
              <img
                className="polaroidImage"
                src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/welcome_crop_yicrh1.png"
                alt="polaroid early restaurant days"
              ></img>
            </picture>
          </div>
          <div className="rightHalfCenter">
            <h2 className="h2">{section_welcome_header}</h2>
            <p>{section_welcome_text}</p>
          </div>
        </div>
      </section>
      <section className="section paddingSection background">
        <div className="grid alignCenter">
          <div className="leftHalfCenter">
            <h2 className="h2">{section_food_header}</h2>
            <p>{section_food_text}</p>
          </div>
          <div className="rightHalf">
            <picture>
              <source
                media="(min-width: 200px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/finest_crop_ei5byw.png"
              />
              <img
                className="polaroidImage"
                src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/finest_crop_ei5byw.png"
                alt="polaroid restaurant 20th anniversary"
              ></img>
            </picture>
          </div>
        </div>
      </section>
      <section className="section paddingSection textCenter">
        <div className="grid smallGap">
          <h2 className="h2 fullWidth paddingSectionSmall">
            {section_favorites_header}
          </h2>
          <div className="leftThird">
            <div className="flex justifyCenter paddingSectionSmall">
              <Shrimp role="presentation" alt="" />
              <Fries role="presentation" alt="" className="marginIcon" />
            </div>
            <p>{section_favorites_seafood}</p>
          </div>
          <div className="centerThird">
            <div className="flex justifyCenter paddingSectionSmall">
              <Burger role="presentation" alt="" className="marginIcon" />
              <Cutlery role="presentation" alt="" />
            </div>
            <p>{section_favorites_griddle}</p>
          </div>
          <div className="rightThird">
            <div className="flex justifyCenter paddingSectionSmall">
              <Beer role="presentation" alt="" />
              <Soda role="presentation" alt="" className="marginIcon" />
            </div>
            <p>{section_favorites_beverages}</p>
          </div>
          <div className="fullWidth textCenter extraBold upperCase ">
            <Link className="link primaryColor" to="/visit/">
              View Menu
            </Link>
          </div>
        </div>
      </section>
      <section className="section paddingSection">
        <div className="grid alignCenter">
          <h2 className="h2 fullWidth textCenter paddingSectionSmall">
            {section_family_header}
          </h2>
          <div className="leftHalf">
            <picture>
              <source
                media="(min-width: 200px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/family_1_aumyy6.png"
              />
              <img
                className="galleryImage"
                src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/family_1_aumyy6.png"
                alt="family"
              ></img>
            </picture>
          </div>
          <div className="rightHalf">
            <picture>
              <source
                media="(min-width: 100px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/family_2_kb7tor.png"
              />
              <img
                className="galleryImage"
                src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/family_2_kb7tor.png"
                alt="family"
              ></img>
            </picture>
          </div>
          <div className="leftHalf">
            <picture>
              <source
                media="(min-width: 100px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1656265482/family_3_vtg1ri.png"
              />
              <img
                className="galleryImage galleryPosition"
                src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1656265482/family_3_vtg1ri.png"
                alt="family"
              ></img>
            </picture>
          </div>
          <p className="rightHalf">{section_family_text}</p>
        </div>
      </section>
    </>
  )
}

export default Home
