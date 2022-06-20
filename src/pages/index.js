import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Home from "../components/home"

const IndexPage = props => {
  const data = props?.data?.allFile?.nodes[0]?.childMarkdownRemark?.frontmatter
  console.log(data)

  return (
    <Layout>
      <Seo title="Home" />
      <Home data={data}></Home>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
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
            section_welcome_header
            section_welcome_text
            section_food_header
            section_food_text
            section_family_header
            section_family_text
            section_favorites_header
            section_favorites_seafood
            section_favorites_griddle
            section_favorites_beverages
          }
        }
      }
    }
  }
`
