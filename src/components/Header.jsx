import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Logo from "../images/logo.inline.svg"
import Hamburger from "../images/hamburger.inline.svg"
import Close from "../images/close.inline.svg"

import "./layout.css"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuLinks = [
    {
      url: "/menu/",
      label: "Menu",
    },
    {
      url: "/visit/",
      label: "Visit",
    },
    {
      url: "/gallery/",
      label: "Gallery",
    },
    {
      url: "/press/",
      label: "Press",
    },
  ]

  const mobileMenuLinks = [
    {
      url: "/",
      label: "Home",
    },
    ...menuLinks,
  ]

  return (
    <>
      <header className="sticky paddingTop30 paddingMin">
        <nav>
          <div className="flex alignCenter justifySpaceBetween desktopOnly">
            <div className="flex">
              <Link to="/">
                <Logo className="logoIcon" />
              </Link>
            </div>
            <div className="flex justifyEnd upperCase extraBold marginNavOffset">
              {menuLinks.map(({ url, label }) => (
                <Link key={label} className="link primary marginNav" to={url}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="mobileOnly flex justifySpaceBetween">
            <div className="flex">
              <Link to="/">
                <Logo className="logoIconSmall " />
              </Link>
            </div>
            <button
              className="transparent noBorder"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Hamburger className="hamburgerIcon fillPrimary" />
            </button>
          </div>
        </nav>
      </header>
      <div
        className={`mobileMenu fullvW fullVh absolute top base zMenu ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flexColumn paddingTop30 paddingMin">
          <button
            className="transparent noBorder alignSelfEnd"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Close className="closeIcon" />
          </button>
          <div className="upperCase extraBold flexColumn">
            {mobileMenuLinks.map(({ url, label }) => (
              <div className="paddingTop20">
                <Link key={label} className="link primary marginNav" to={url}>
                  {label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
