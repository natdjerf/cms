/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "@fontsource/raleway/400.css"
import "@fontsource/raleway/800.css"

import Header from "./Header"
import Footer from "./Footer"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      allFile(
        filter: { sourceInstanceName: { eq: "content" }, name: { eq: "home" } }
      ) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              title
              hours
              hours_description
              phone
              email
              address_line_1
              address_line_2
            }
          }
        }
      }
    }
  `)

  const footerData = data?.allFile?.nodes[0]?.childMarkdownRemark?.frontmatter

  return (
    <div className="layout relative">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className="main flexColumn alignCenter">{children}</main>
      <Footer className="footer" data={footerData} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
