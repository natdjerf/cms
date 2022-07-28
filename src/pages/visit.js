import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import Visit from "../components/Visit"

const VisitPage = props => {
  const data =
    props?.data?.allFile?.nodes[0]?.childMarkdownRemark?.frontmatter || {}

  return (
    <Layout>
      <Visit data={data} />
    </Layout>
  )
}

export default VisitPage

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
          }
        }
      }
    }
  }
`
