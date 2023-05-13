import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Home from "../components/Home"

const IndexPage = props => {
  const data = props?.data?.allFile?.nodes[0]?.childMarkdownRemark?.frontmatter

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
            welcome_image_about_url
            welcome_image_about_description
            welcome_image_food_url
            welcome_image_food_description
            family_image_1_url
            family_image_1_description
            family_image_2_url
            family_image_2_description
            family_image_3_url
            family_image_3_description
          }
        }
      }
    }
  }
`
