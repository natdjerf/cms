import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Navigation } from "./navigation"

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <Navigation></Navigation>
      <h1 className="headline">Tony's Clam Shop</h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
