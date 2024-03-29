require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: `Health Unchained`,
    description: `Health Unchained conducts and facilitates interviews and conversations with healthcare leaders, executives, entrepreneurs, researchers, and medical professionals who are working on interesting and important projects enabled by blockchain technology.`,
    author: `aaron`,
    menuLinks:[
      {
        name:'home',
        link:'/'
      },
      {
        name:'episodes',
        link:'/episodes'
      },
      {
        name:'about',
        link:'/about'
      },
      {
        name:'contact',
        link:'/contact'
      }
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-soundcloud`,
      options: {
        userID: process.env.SOUNDCLOUD_USER_ID,
        clientID: process.env.SOUNDCLOUD_CLIENT_ID,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    `gatsby-plugin-lodash`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
  ],
}
