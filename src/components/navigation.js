import * as React from "react"
import { Link } from "gatsby"


export const Navigation = () => {

    return (
        <nav>
                <ul>
                    <li>
                    <Link to="/about/">About</Link>
                    </li>
                    <li>
                    <Link to="/menu/">Menu</Link>
                    </li>
                    <li>
                    <Link to="/history/">History</Link>
                    </li>
                    <li>
                    <Link to="/visit/">Visit</Link>
                    </li>
                </ul>
        </nav>
    )
}

