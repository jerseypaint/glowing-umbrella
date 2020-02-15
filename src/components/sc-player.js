import React from "react"

const Player = (props) => (
    <iframe title={props.title} width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${props.trackId}`}>
    </iframe>
)
  
  export default Player
