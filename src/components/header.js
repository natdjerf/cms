import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Logo from "../images/logo.inline.svg"

import "./layout.css"

const Header = () => (
  <header className="sticky paddingTopHeader paddingMin">
    <nav>
      <div className="flex alignCenter justifySpaceBetween">
        <div className="flex">
          <Link to="/">
            <Logo className="logoIcon" />
          </Link>
        </div>
        <div className="flex justifyEnd upperCase extraBold marginNavOffset">
          <Link className="link primary marginNav" to="/history/">
            Menu
          </Link>
          <Link className="link primary marginNav" to="/visit/">
            Visit
          </Link>
        </div>
      </div>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
