/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Global, css } from "@emotion/core"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
    <Global
      styles={css`
        section {
         padding: 3em 1em;
        }

        .container {
          margin: 0 auto;
          max-width: 1190px;
        }

        a {
          color: #000;
          transition: all 200ms;

          &:hover {
            color: #119DA4;
          }
        }
      `}
    />
      <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
