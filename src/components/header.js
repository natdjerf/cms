import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "./layout.css"

const Header = () => (
  <header className="sticky paddingTop paddingMin">
    <nav>
      <div className="flex alignCenter justifySpaceBetween">
        <div className="flex">
          LOGO
          <Link to="/logo/"></Link>
        </div>
        <div className="flex justifyEnd upperCase extraBold marginNavOffset">
          <Link className="marginNav" to="/history/">
            Menu
          </Link>
          <Link className="marginNav" to="/visit/">
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
