import * as React from "react"
import { Link } from "gatsby"

export const Navigation = () => {
  return (
    <nav>
      <div className="logo">
        LOGO
        <Link to="/logo/"></Link>
      </div>
      <div className="navigation">
        <ul>
          <li className="nav_header">
            <Link to="/history/">Menu</Link>
          </li>
          <li className="nav_header">
            <Link to="/visit/">Visit</Link>
          </li>
          <li className="nav_header">
            <Link to="/history/">Gallery</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
