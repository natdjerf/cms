import React from "react"
import Layout from "../components/layout"

const Sections = {
  box: {
    display_name: "By the Box",
    section_description: "",
    additional_text: "",
  },
  broiler: {
    display_name: "Fresh from The Broiler",
    section_description: "Served with rice pilaf and a small garden salad",
    additional_text: "",
  },
  plates: {
    display_name: "Plates",
    section_description: "Served with french fries and homemade coleslaw",
    additional_text: "Sweet potato fries available for additional fee",
  },
  baskets: {
    display_name: "Baskets",
    section_description: "Served with french fries",
    additional_text: "Sweet potato fries available for additional fee",
  },
  sandwiches: {
    display_name: "Deli Sandwiches",
    section_description: "Served with chips and a pickle spear",
    additional_text:
      "Choice of deli roll, white bread, wheat bread, or Syrian pocket",
  },
  griddle: {
    display_name: "Off the Griddle",
    section_description: "Order as a platter to add french fries and coleslaw",
    additional_text: "",
  },
  wraps_subs: {
    display_name: "Wraps and Subs",
    section_description: "Served with chips and a pickle spear",
    additional_text: "",
  },
  salads: {
    display_name: "Salads",
    section_description:
      "Choice of Italian, oil and vinegar, Greek, ranch, caesar, balsamic vinaigrette, or blue cheese dressing",
    additional_text: "",
  },
  sides: {
    display_name: "Sides",
    section_description: "",
    additional_text: "",
  },
  kids: {
    display_name: "Kiddie Meals",
    section_description: "Served with kids french fries and soda",
    additional_text: "",
  },
  favorites: {
    display_name: "Favorites",
    section_description: "",
    additional_text: "",
  },
}

const Menu = () => {
  return (
    <Layout>
      <h1>Menu</h1>
    </Layout>
  )
}

export default Menu
