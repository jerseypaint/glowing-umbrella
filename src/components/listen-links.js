import React from "react"
import styled from "@emotion/styled"
import { StaticQuery, graphql } from "gatsby"

const Grid = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
`
const ExLink = styled.li`
    padding: 0 1em;
    border-right: 1px solid #000;

    &:last-of-type {
      border: none;
    }
`

const ListenLinks = (props) => (
  <StaticQuery
  query={graphql`
    {
      allContentfulPodcastLinks {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  `}
  render={ data => 
  
    <Grid style={props.style}>
    {data.allContentfulPodcastLinks.edges.map( link => (
  <ExLink><a href={link.node.url} target={`_blank`}>{link.node.name}</a></ExLink>
    ))}
  </Grid>
  }
></StaticQuery>

)
  
  export default ListenLinks