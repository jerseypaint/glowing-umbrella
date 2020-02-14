import React from "react"



const Section = (props) => {
  return (
  <section style={props.style}>
    <div className={`container`}>
        {props.children}
    </div>
  </section>
)}
  
  export default Section