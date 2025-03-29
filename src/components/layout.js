/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "@fontsource/raleway/400.css"
import "@fontsource/raleway/800.css"

import Header from "./Header"
import Footer from "./Footer"
import Banner from "./Banner"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      footer: allFile(
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
      banner: allFile(
        filter: {
          sourceInstanceName: { eq: "content" }
          name: { eq: "banner" }
        }
      ) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              message
              active
            }
          }
        }
      }
    }
  `)

  const footerData = data?.footer?.nodes[0]?.childMarkdownRemark?.frontmatter
  const bannerData = data?.banner?.nodes[0]?.childMarkdownRemark?.frontmatter
  const showBanner = bannerData?.active && bannerData?.message

  return (
    <div className="layout relative">
      {showBanner && <Banner data={bannerData} />}
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className="main flexColumn alignCenter">{children}</main>
      <Footer className="footer" data={footerData} />
    </div>
  )
}



export default Layout
