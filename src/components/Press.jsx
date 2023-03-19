import React from "react"

const Press = () => {
  return (
    <>
      <h1 className="h1">In the Press</h1>
      <div className="">
        <div className="galleryGrid foodGrid gap5 justifyCenter paddingMin">
          <div>
            <h4>Phantom Gourmet</h4>
            <iframe
              className="pressIframe"
              src="https://www.youtube.com/embed/GMRguJz_vFs"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <h4>Phantom Gourmet - Hidden Jewel</h4>
            <iframe
              className="pressIframe"
              src="https://www.youtube.com/embed/k14rf3Bd1Zs"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <h4>Fox News - Taste of the Town</h4>
            <iframe
              className="pressIframe"
              src="https://www.youtube.com/embed/tE6QUCcykuM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <h4>Patriot Ledger - Mystery of the Sea</h4>
            <iframe
              className="pressIframe"
              src="https://www.youtube.com/embed/5_PFOgcGou8"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}

export default Press
