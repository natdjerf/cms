import React from "react"

const Gallery = props => {
  console.log(props.content)
  const [config, setConfig] = React.useState({})

  const sections = {
    plate: {
      display_name: "Plates",
      items: [],
    },
    food: {
      display_name: "Food",
      items: [],
    },
    team: {
      display_name: "The Team",
      items: [],
    },
    store: {
      display_name: "The Shop Over the Years",
      items: [],
    },
  }

  React.useEffect(() => {
    props?.content?.forEach(node => {
      const imageNode = node?.childMarkdownRemark?.frontmatter

      if (imageNode?.category && imageNode?.image && imageNode?.title) {
        if (sections[imageNode.category]) {
          sections[imageNode.category].items.push(imageNode)
        }
      }
    })

    setConfig(sections)
  }, [])

  return (
    <section className="textCenter">
      <h1 className="h1">Gallery</h1>
      <div className="">
        {Object.entries(config).map(([key, value]) => {
          return (
            <div key={key} className="h3Bold uppercase paddingTB30">
              <h3>{value.display_name}</h3>
              <div className="">
                {value.items.map(item => (
                  <div key={item.title}>
                    <picture className="">
                      <source media="(min-width: 200px)" srcSet="" />
                      <img
                        className=""
                        src={item?.image}
                        alt={item?.title}
                      ></img>
                      <p>{item?.title}</p>
                    </picture>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Gallery
