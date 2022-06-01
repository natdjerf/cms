import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = props => {
  const data = props.data.allFile.edges[0].node.childMarkdownRemark.frontmatter

  return (
    <Layout>
      <Seo title="Home" />
      <p>{data.intro}</p>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: { eq: "content" }, name: { eq: "home" } }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              intro
              image
            }
          }
        }
      }
    }
  }
`
