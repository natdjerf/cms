import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import Gallery from "../components/Gallery"

const GalleryPage = props => {
  // const data =
  //   props?.data?.allFile?.nodes[0]?.childMarkdownRemark?.frontmatter || {}

  return (
    <Layout>
      <Gallery></Gallery>
    </Layout>
  )
}

export default GalleryPage

// export const query = graphql``
