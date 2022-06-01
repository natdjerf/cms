import * as React from "react"
import { Link } from "gatsby"

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/logo/"></Link>
        </li>
        <li>
          <Link to="/history/">Menu</Link>
        </li>
        <li>
          <Link to="/visit/">Visit</Link>
        </li>
        <li>
          <Link to="/history/">Gallery</Link>
        </li>
      </ul>
    </nav>
  )
}
