import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Navigation } from "./navigation"
import "./layout.css"

const Header = ({ siteTitle }) => (
  <header>
    <Navigation></Navigation>
    <h1 className="h1">{siteTitle}</h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
