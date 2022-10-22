import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { css } from "@emotion/react"
import styled from "@emotion/styled"

const header = css`
  padding: .5em 1em;
  background-color: #000;

  @media (min-width: 768px) {
    padding: .5em 0;
  }
`
const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1100px;
`
const Nav = styled.nav`
  display: none;
  flex: 1 1;

  ul {
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 0 0 0 3em;

    li {
      list-style: none;
      padding: 1em;
      margin-bottom: 0;
      font-size: .8889em;

      a {
        text-decoration: none;
        font-weight: 700;
        color: #fff;
        transition: all 200ms;
        text-transform: capitalize;

        &:hover {
          color: #119DA4;
        }
      }
    }
  }

  @media (min-width: 769px) {
    display: inline-block;
  }
`
const MenuButton = styled.button`
  height: 50px;
  width: 50px;
  padding: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
  z-index: 199;
  span {
    display: block;
    height: 2px;
    background-color: #fff;
    margin: 8px 0;
    -webkit-transition: transform 400ms ease;
    -moz-transition:    transform 400ms ease;
    -o-transition:      transform 400ms ease;
    -ms-transition:     transform 400ms ease;
    transition:         transform 400ms ease;

    .drawerOpen & {
      background-color: #fff;
      margin: 0;

      &:nth-of-type(1) {
        transform: rotate(45deg) translate(0px,1px);
        -moz-transform: rotate(45deg) translate(0px,1px);  
        -webkit-transform: rotate(45deg) translate(0px,1px);  
        -o-transform: rotate(45deg) translate(0px,1px);  
        -ms-transform: rotate(45deg) translate(0px,1px);  
      }
      &:nth-of-type(2) {
        transform: rotate(135deg) translate(0px,1px);
        -moz-transform: rotate(135deg) translate(0px,1px);  
        -webkit-transform: rotate(135deg) translate(0px,1px);  
        -o-transform: rotate(135deg) translate(0px,1px);  
        -ms-transform: rotate(135deg) translate(0px,1px);  
      }
    }
  }

  .drawerOpen & {
    position: fixed;
    top: 0;
    right: 0;
  }

  @media (min-width: 769px) {
    display: none;
  }
`

const NavDrawer = styled.div`
  position: fixed;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  z-index: 99;
  text-align: center;
  background-color: #000;
  opacity: 0;
  transition: transform 100ms ease, opacity 600ms ease;

  .drawerOpen & {
    opacity: 1;
    -webkit-transform: translateX(100%);
    -moz-transform: translateX(100%);
    -o-transform: translateX(100%);
    -ms-transform: translateX(100%);
    transform: translateX(100%);
  }

  ul {
    margin: 60px 0 0;

    li {
      list-style: none;
      padding: 2em;

      a {
        color: #fff;
        font-size: 1.2em;
        text-transform: capitalize;
        text-decoration: none;
        font-weight: 700;
      }
    }
  }

  @media (min-width: 769px) {
    display: none;
  }

`

const Header = () => {
  function handleClick(e) {
    e.preventDefault();
    document.getElementById("site-header").classList.toggle("drawerOpen");
  }
  
  const data = useStaticQuery(graphql`
    query headerQuery {
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
          gatsbyImageData(width: 200)
          description
        }
      }
    }
  `)

  return (
      <header id={`site-header`} css={header}>
        <Wrap>
          <Link to={`/`}>
            {data.contentfulGeneral.logo.gatsbyImageData &&
              <GatsbyImage image={data.contentfulGeneral.logo.gatsbyImageData} alt={data.contentfulGeneral.logo.description} />
            }
            
            </Link>
          <Nav>
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
          </Nav>
          <MenuButton onClick={handleClick} name={`menu toggle`} type={`button`}>
            <span />
            <span />
          </MenuButton>
          <NavDrawer>
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
          </NavDrawer>
        </Wrap>
      </header>
  )
}

export default Header
