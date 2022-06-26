import * as React from "react"
import { Link } from "gatsby"

const Home = ({ data }) => {
  const {
    title,
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
        <div className="flex justifyCenter paddingTop">
          <h1 className="h1">Tony's Clam Shop</h1>
        </div>
      </section>
      <section className="section padding">
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
            <a className="block" href={`mailto:${email}`}>
              {email}
            </a>
            <a className="block" href={`tel:${phone.replace("-", "")}`}>
              {phone}
            </a>
          </div>
        </div>
      </section>
      <section className="section padding">
        <div className="gr gc">
          <div className="gr g50">
            <picture>
              <source
                media="(min-width: 200px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/welcome_crop_yicrh1.png"
              />
              <img src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/welcome_crop_yicrh1.png"></img>
            </picture>
            <div>
              <div className="section--text">
                <h2 className="h2">{section_welcome_header}</h2>
                <p>{section_welcome_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section padding">
        <div className="gr gc">
          <div className="gr g50">
            <div className="section--text">
              <h2 className="h2">{section_food_header}</h2>
              <p>{section_food_text}</p>
            </div>
            <picture>
              <source
                media="(min-width: 200px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/finest_crop_ei5byw.png"
              />
              <img src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/finest_crop_ei5byw.png"></img>
            </picture>
          </div>
        </div>
      </section>
      <section className="section padding">
        <div className="grid">
          <h2 className="h2 fullWidth textCenter">
            {section_favorites_header}
          </h2>
          <div className="leftThird">
            <div>
              images
              <svg></svg>
            </div>
            <p>{section_favorites_seafood}</p>
          </div>
          <div className="centerThird">
            <div>
              images
              <svg></svg>
            </div>
            <p>{section_favorites_griddle}</p>
          </div>
          <div className="rightThird">
            <div>
              images
              <svg></svg>
            </div>
            <p>{section_favorites_beverages}</p>
          </div>

          <Link className="fullWidth textCenter" to="/visit/">
            View Menu
          </Link>
        </div>
      </section>
      <section className="section padding flexColumn">
        <h2 className="h2">{section_family_header}</h2>
        <div className="gr gc">
          <div className="gr g50">
            <picture className="section--text hw">
              <source
                media="(min-width: 200px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/family_1_aumyy6.png"
              />
              <img src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/family_1_aumyy6.png"></img>
            </picture>
            <picture className="section--text hw">
              <source
                media="(min-width: 100px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/family_2_kb7tor.png"
              />
              <img src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1655768250/family_2_kb7tor.png"></img>
            </picture>
            <picture className="section--text hw">
              <source
                media="(min-width: 100px)"
                srcset="https://res.cloudinary.com/dpanbsxt4/image/upload/v1656265482/family_3_vtg1ri.png"
              />
              <img src="https://res.cloudinary.com/dpanbsxt4/image/upload/v1656265482/family_3_vtg1ri.png"></img>
            </picture>
            <p>{section_family_text}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
