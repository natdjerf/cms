import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import Menu from "../components/Menu"

const MenuPage = props => {
  const data = props?.data?.allFile?.nodes || []

  return (
    <Layout>
      <Menu data={data} />
    </Layout>
  )
}

export default MenuPage

export const query = graphql`
  query Menu {
    allFile(
      filter: { dir: { regex: "/menu|beverage/" } }
      sort: { fields: childMarkdownRemark___frontmatter___title }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            category
            name
            title
            price
            small_price
            medium_price
            large_price
            drinks
          }
        }
      }
    }
  }
`
