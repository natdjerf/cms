import React from "react"

const Visit = ({ data }) => {
  const { hours, phone = "" } = data

  return (
    <>
      <h1 className="h1">Visit</h1>

      <div className="flexColum alignCenter textCenter paddingTop40">
        <h3 className="h3 primaryColor">
          {`Now open for our 59th season! We will be open every day ${hours}`}
        </h3>
        <p className="paddingTop20 paddingBottom20">
          Hours can vary, please call!&nbsp;
          <a className="primary" href={`tel:${phone.replace("-", "")}`}>
            {phone}
          </a>
        </p>
        <div className="embeddedMap marginTop60 marginBottom60">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2952.154497804224!2d-71.00818498385668!3d42.27522527919267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37b5244970e17%3A0x9db015c82bab9984!2sTony&#39;s%20Clam%20Shop!5e0!3m2!1sen!2sus!4v1659202572266!5m2!1sen!2sus"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </div>
      </div>
    </>
  )
}

export default Visit
