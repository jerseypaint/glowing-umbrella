import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Section from "./section"
import { Link } from "gatsby"

const Grid = styled.div`
    display: flex;
    flex-flow: row wrap;
`

const GridItem = styled.div`
    width: 100%;
    margin-bottom: 1em;

    @media (min-width: 767px) {
      flex: 1 1;

      h3, ul {
        padding-left: 30%;
      }
    }
    
`

const footer = css`
    background-color: #000;
    color: #fff;

    h2, h3 {
        color: #fff;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    a {
        color: #fff;
        text-decoration: none;
        text-transform: capitalize;

        &:hover {
            color: #119DA4;
        }
    }
`

const flexList = css`
    display: flex;

    li {
      margin-right: 1em;
    }
`

const mobileGridItem = css`
    width: 50%;
`

const Footer = () => {
    const data = useStaticQuery(graphql`
    query footerQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
      contentfulGeneral {
        logo {
          fixed(width: 280) {
            width
            height
            src
            srcSet
          }
        }
        hpnLogo {
          fixed(width: 200) {
            width
            height
            src
            srcSet
          }
        }
      }
      allContentfulPodcastLinks {
        edges {
          node {
            name
            url
          }
        }
      }
      allContentfulSocialMediaLinks {
        edges {
          node {
            name
            url
            icon
          }
        }
      }
    }
  `)
    return (
    <footer css={footer}>
        <Section>
            <Grid>
                <GridItem>
                    <Img fixed={data.contentfulGeneral.logo.fixed} alt={data.contentfulGeneral.logo.description} />
                    <Img fixed={data.contentfulGeneral.hpnLogo.fixed} alt={data.contentfulGeneral.hpnLogo.description} />
                </GridItem>
                <GridItem css={mobileGridItem}>
                    <h3>Read</h3>
                    <ul>
                        {data.site.siteMetadata.menuLinks.map(link => (
                            <li
                            key={link.name}
                            >
                            <Link to={link.link}>
                                {link.name}
                            </Link>
                            </li>
                        ))}
                    </ul>
                </GridItem>
                <GridItem css={mobileGridItem}>
                    <h3>Listen</h3>
                    <ul>
                    {data.allContentfulPodcastLinks.edges.map(link => (
                            <li
                            key={link.node.name}
                            >
                            <a href={link.node.url}>
                                {link.node.name}
                            </a>
                            </li>
                        ))}
                    </ul>
                </GridItem>
                <GridItem>
                    <h3>Follow</h3>
                    <ul css={flexList}>
                    {data.allContentfulSocialMediaLinks.edges.map(link => (
                            <li
                            key={link.node.name}
                            >
                            <a href={link.node.url}>
                              <FontAwesomeIcon icon={['fab', `${link.node.icon}`]} />
                            </a>
                            </li>
                        ))}
                    </ul>
                </GridItem>
            </Grid>
        </Section>
    </footer>
)}
  
  export default Footer