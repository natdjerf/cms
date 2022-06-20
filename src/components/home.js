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
      <section className="section">landing</section>
      <section className="section">
        <div>
          <h3 className="h3">Hours</h3>
          <p>{hours_description}</p>
          <p>{hours}</p>
        </div>
        <div>
          <h3 className="h3">Location</h3>
          <address>
            <p>{address_line_1}</p>
            <p>{address_line_2}</p>
          </address>
        </div>
        <div>
          <h3 className="h3">Contact</h3>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone.replace("-", "")}`}>{phone}</a>
        </div>
      </section>
      <section className="section">
        <div>image</div>
        <div>
          <h2 className="h2">{section_welcome_header}</h2>
          <p>{section_welcome_text}</p>
        </div>
      </section>
      <section className="section">
        <h2 className="h2">{section_family_header}</h2>
        <p>{section_family_text}</p>
      </section>
      <section className="section">
        <h2 className="h2">{section_favorites_header}</h2>
        <div>
          <div>
            images
            <svg></svg>
          </div>
          <p>{section_favorites_seafood}</p>
        </div>
        <div>
          <div>
            images
            <svg></svg>
          </div>
          <p>{section_favorites_griddle}</p>
        </div>
        <div>
          <div>
            images
            <svg></svg>
          </div>
          <p>{section_favorites_beverages}</p>
        </div>
        <Link to="/visit/">View Menu</Link>
      </section>
      <section className="section">
        <h2 className="h2">{section_family_header}</h2>
        <div>images</div>
        <p>{section_family_text}</p>
      </section>
    </>
  )
}

export default Home
