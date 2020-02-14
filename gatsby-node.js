/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async function({ actions, graphql }) {
    const { data } = await graphql(`
        query {
            allSoundcloudtrack {
                edges {
                    node {
                        permalink
                    }
                }
            }
        }
    `)
    data.allSoundcloudtrack.edges.forEach(edge => {
      const slug = edge.node.permalink
      actions.createPage({
        path: slug,
        component: require.resolve(`./src/templates/episode.js`),
        context: { slug: slug },
      })
    })
  }