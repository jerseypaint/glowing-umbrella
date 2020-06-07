import React from "react"

const Player = (props) => {
  
  const srcId = props.src.split(":")[2]
  
  return (
    <iframe src={`https://open.spotify.com/embed-podcast/episode/${srcId}`} width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media" title={props.title}></iframe>
  )
}
  
  export default Player

