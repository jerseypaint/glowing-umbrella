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
    data.allSoundcloudtrack.edges.forEach((edge, index) => {
    const prev = index === 0 ? false : data.allSoundcloudtrack.edges[index - 1].node.permalink
    const next = index === data.allSoundcloudtrack.edges.length - 1 ? false : data.allSoundcloudtrack.edges[index + 1].node.permalink
    const slug = edge.node.permalink
      actions.createPage({
        path: slug,
        component: require.resolve(`./src/templates/episode.js`),
        context: { 
            slug: slug,
            prev,
            next
         },
      })
    })
  }