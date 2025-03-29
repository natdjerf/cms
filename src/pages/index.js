import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Home from "../components/Home"

export const Head = props => {
  const data = props?.data?.allFile?.nodes[0]?.childMarkdownRemark?.frontmatter
  const title = data?.title
  const description = data?.description

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta property="og:title" content={title}></meta>
      <meta property="og:description" content={description}></meta>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </>
  )
}

const IndexPage = props => {
  const data = props?.data?.allFile?.nodes[0]?.childMarkdownRemark?.frontmatter

  return (
    <Layout>
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
