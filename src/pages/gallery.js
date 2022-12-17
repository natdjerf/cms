import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import Gallery from "../components/Gallery"

const GalleryPage = props => {
  const content = props?.data?.allFile?.nodes || []

  return (
    <Layout>
      <Gallery content={content}></Gallery>
    </Layout>
  )
}

export default GalleryPage

const query = graphql`
  query Gallery {
    allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        relativeDirectory: { eq: "gallery" }
      }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            category
            image
            name
            title
          }
        }
      }
    }
  }
`
