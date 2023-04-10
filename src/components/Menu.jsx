import React from "react"
import Shrimp from "../images/shrimp.inline.svg"
import Fries from "../images/fries.inline.svg"
import Burger from "../images/burger.inline.svg"
import Cutlery from "../images/cutlery.inline.svg"
import Beer from "../images/beer.inline.svg"
import Soda from "../images/soda.inline.svg"
import Bacon from "../images/bacon.inline.svg"
import BbqTools from "../images/bbq-tools.inline.svg"
import Cocktail from "../images/cocktail.inline.svg"
import Drumstick from "../images/drumstick.inline.svg"

const Menu = ({ data }) => {
  const [config, setConfig] = React.useState({ food: {}, beverage: {} })

  const sections = {
    box: {
      display_name: "By the Box",
      section_description: "Prices are small, medium, and large boxes",
      additional_text: "",
      one_size: false,
      items: [],
    },
    broiler: {
      display_name: "Fresh from The Broiler",
      section_description: "Served with rice pilaf and a small garden salad",
      additional_text: "",
      one_size: true,
      items: [],
    },
    plates: {
      display_name: "Plates",
      section_description: "Served with french fries and homemade coleslaw",
      additional_text: "Sweet potato fries available for additional fee",
      one_size: true,
      items: [],
    },
    baskets: {
      display_name: "Baskets",
      section_description: "Served with french fries",
      additional_text: "Sweet potato fries available for additional fee",
      one_size: true,
      items: [],
    },
    sandwiches: {
      display_name: "Deli Sandwiches",
      section_description: "Served with chips and a pickle spear",
      additional_text:
        "Choice of deli roll, white bread, wheat bread, or Syrian pocket",
      one_size: true,
      items: [],
    },
    griddle: {
      display_name: "Off the Griddle",
      section_description:
        "Order as a platter to add french fries and coleslaw",
      additional_text: "",
      one_size: true,
      items: [],
    },
    wraps: {
      display_name: "Wraps",
      section_description: "Served with chips and a pickle spear",
      additional_text: "",
      one_size: true,
      items: [],
    },
    subs: {
      display_name: "Subs",
      section_description: "Served with chips and a pickle spear",
      additional_text: "",
      one_size: true,
      items: [],
    },
    salads: {
      display_name: "Salads",
      section_description:
        "Choice of Italian, oil and vinegar, Greek, ranch, caesar, balsamic vinaigrette, or blue cheese dressing",
      additional_text: "",
      one_size: true,
      items: [],
    },
    sides: {
      display_name: "Sides",
      section_description: "",
      additional_text: "",
      one_size: false,
      items: [],
    },
    kids: {
      display_name: "Kiddie Meals",
      section_description: "Served with kids french fries and soda",
      additional_text: "",
      one_size: true,
      items: [],
    },
    favorites: {
      display_name: "Favorites",
      section_description: "",
      additional_text: "",
      one_size: true,
      items: [],
    },
  }

  const beverage_sections = {
    cocktails: {
      display_name: "Cocktails",
      items: [],
    },
    frozen: {
      display_name: "Frozen",
      items: [],
    },
    beer: {
      display_name: "Beer, Seltzer, Cider",
      items: [],
    },
    draft: {
      display_name: "Draft",
      items: [],
    },
    wine: {
      display_name: "Wine",
      items: [],
    },
    liquor: {
      display_name: "Liquor",
      items: [],
    },
  }

  React.useEffect(() => {
    data.forEach(item => {
      const menuItem = item?.childMarkdownRemark?.frontmatter
      const category = menuItem?.category

      if (sections[category]) {
        sections[category].items.push(menuItem)
      } else if (beverage_sections[category]) {
        beverage_sections[category].items.push(menuItem)
      }
    })

    setConfig({
      food: sections,
      beverage: beverage_sections,
    })
  }, [])

  const buildItem = item => {
    return (
      <p key={item.name} className="paddingTop8">
        {item?.name} {item?.price ? `  -  ${item.price}` : null}
        {item?.small_price ? `  -  ${item.small_price}` : null}
        {item?.medium_price ? `  |  ${item.medium_price}` : null}
        {item?.large_price ? `  |  ${item.large_price}` : null}
      </p>
    )
  }

  const buildBeverage = item => {
    const drinks = item?.drinks?.split(",")

    return drinks.map(drink => <p key={drink}>{drink}</p>)
  }

  const buildSection = (section, isBeverage) => {
    if (!section.items) {
      return null
    }
    return (
      <div className="fullWidthSmall" key={section.name}>
        <h3 className="h3 upperCase paddingTop20 primaryColor">
          {section.display_name}
        </h3>
        {section.section_description && (
          <p className="bodySmall paddingTop10">
            {section.section_description}
          </p>
        )}

        {isBeverage ? (
          <div className="paddingTop20 paddingBottom20">
            {section.items.map(item => buildBeverage(item))}
          </div>
        ) : (
          <div className="paddingTop20 paddingBottom20">
            {section.items.map(item => buildItem(item))}
          </div>
        )}
        {section.additional_text && (
          <p className="bodySmall">{section.additional_text}</p>
        )}
      </div>
    )
  }

  return (
    <section className="textCenter">
      <h1 className="h1">Menu</h1>
      <div className="mobileOnly flex justifyCenter gap5">
        <Fries role="presentation" alt="" className="w40" />
        <Shrimp role="presentation" alt="" className="w60" />
        <Beer role="presentation" alt="" className="w50" />
        <Burger role="presentation" alt="" className="w60" />
        <Soda role="presentation" alt="" className="w40" />
      </div>
      <div className="flex justifyCenter bodySmall">
        Prices subject to change
      </div>
      <div className="textCenter paddingTop20 grid">
        <Shrimp role="presentation" alt="" className="col4 row1 hideMobile" />
        <Fries role="presentation" alt="" className="col12 row2 hideMobile" />
        <Burger role="presentation" alt="" className="col3 row3 hideMobile" />
        <Bacon role="presentation" alt="" className="col11 row4 hideMobile" />
        <BbqTools role="presentation" alt="" className="col4 row5 hideMobile" />
        <Drumstick
          role="presentation"
          alt=""
          className="col12 row6 hideMobile"
        />
        <Cutlery role="presentation" alt="" className="col3 row7 hideMobile" />
        <Shrimp role="presentation" alt="" className="col11 row8  hideMobile" />
        <Fries role="presentation" alt="" className="col4 row9 hideMobile" />
        <Burger
          role="presentation"
          alt=""
          className="col12 row10  hideMobile"
        />
        <Bacon role="presentation" alt="" className="col3 row11 hideMobile" />
        <BbqTools
          role="presentation"
          alt=""
          className="col11 row12 hideMobile"
        />
        {Object.entries(config.food).map(([key, section]) =>
          buildSection(section)
        )}
      </div>

      <h2 className="h2">Beverages</h2>
      <div className="textCenter paddingTop20 grid">
        <Cocktail role="presentation" alt="" className="col4 row1 hideMobile" />
        <Beer role="presentation" alt="" className="col12 row2 hideMobile" />
        <Soda role="presentation" alt="" className="col3 row3 hideMobile" />
        <Cocktail
          role="presentation"
          alt=""
          className="col11 row4 hideMobile"
        />
        <Beer role="presentation" alt="" className="col4 row5 hideMobile" />
        <Soda role="presentation" alt="" className="col12 row6  hideMobile" />
        {Object.entries(config.beverage).map(([key, section]) =>
          buildSection(section, true)
        )}
      </div>
    </section>
  )
}

export default Menu
