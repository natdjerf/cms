import React from "react"

const Gallery = props => {
  console.log(props.content)
  const [config, setConfig] = React.useState({})

  const sections = {
    plate: {
      display_name: "Food",
      items: [],
    },
    team: {
      display_name: "The family and employees",
      items: [],
    },
    store: {
      display_name: "The shop over the years",
      items: [],
    },
  }

  React.useEffect(() => {
    props?.content?.forEach(node => {
      const imageNode = node?.childMarkdownRemark?.frontmatter
      if (imageNode?.category && imageNode?.image_url && imageNode?.title) {
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
      <div className="paddingBottom40">
        {Object.entries(config).map(([key, value]) => {
          return (
            <div key={key}>
              <h3 className="h3 upperCase paddingTop40 paddingBottom40">
                {value.display_name}
              </h3>
              <div className={`galleryGrid ${key}Grid paddingMin`}>
                {value.items.map(item => (
                  <div key={item.title}>
                    <picture className={`${key}`}>
                      <source
                        media="(min-width: 200px)"
                        srcSet={`../${item.image_url}`}
                      />
                      <img
                        className=""
                        src={`../${item.image_url}`}
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
