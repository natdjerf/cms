import React from "react"

const foodImages = [
  {
    url: "https://res.cloudinary.com/dpanbsxt4/image/upload/v1659206895/BroiledScallop_ahkdcr.png",
    label: "Broiled scallops",
  },
  {
    url: "https://res.cloudinary.com/dpanbsxt4/image/upload/v1662317709/ChickenKabobPlate_ztsok0.png",
    label: "Chicken kabob",
  },
  {
    url: "https://res.cloudinary.com/dpanbsxt4/image/upload/v1662317708/FriedSeafoodPlate_fvezlu.png",
    label: "Fried seafood",
  },
  {
    url: "https://res.cloudinary.com/dpanbsxt4/image/upload/v1662317708/Tabouli_ojer8l.png",
    label: "Tabouli salad",
  },
  {
    url: "https://res.cloudinary.com/dpanbsxt4/image/upload/v1662317708/BroiledSeafood_dr4lzx.png",
    label: "Broiled seafood",
  },

  {
    url: "https://res.cloudinary.com/dpanbsxt4/image/upload/v1662317708/LobsterRoll_qr77jt.png",
    label: "Lobster roll",
  },
  // {
  //   url: "https://res.cloudinary.com/dpanbsxt4/image/upload/v1662317908/fried_seafood_platter_ddd12z.webp",
  //   label: "Fried seafood",
  // },
  // {
  //   url: "https://res.cloudinary.com/dpanbsxt4/image/upload/v1662317895/lobster_roll_patriot_ledger_w07opq.webp",
  //   label: "Lobster roll",
  // },
]

const teamImages = [
  {
    url: "",
    label: "",
  },
  {
    url: "",
    label: "",
  },
  {
    url: "",
    label: "",
  },
  {
    url: "",
    label: "",
  },
  {
    url: "",
    label: "",
  },
  {
    url: "",
    label: "",
  },
  {
    url: "",
    label: "",
  },
  {
    url: "",
    label: "",
  },
  {
    url: "",
    label: "",
  },
  {
    url: "",
    label: "",
  },
]

const Gallery = () => {
  return (
    <section className="textCenter">
      <h1 className="h1">Gallery</h1>

      <h2 className="h3">Food</h2>
      <div className="grid">
        {foodImages.map(image => {
          return (
            <picture className="span3">
              <source media="(min-width: 200px)" srcSet="" />
              <img className="" src={image.url} alt={image.label}></img>
              <p>{image.label}</p>
            </picture>
          )
        })}
      </div>
      <div className="grid">
        <h2 className="h3">Team</h2>
      </div>
      <div className="grid">
        <h2 className="h3">The shop over the years</h2>
      </div>
    </section>
  )
}

export default Gallery
