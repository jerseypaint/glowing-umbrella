/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async function({ actions, graphql }) {
    const { data } = await graphql(`
        query {
            allEpisode {
                edges {
                    node {
                        name
                        id
                    }
                }
            }
        }
    `)
    data.allEpisode.edges.forEach((edge, index) => {
    const next = index === 0 ? false : data.allEpisode.edges[index - 1].node.name
    const prev = index === data.allEpisode.edges.length - 1 ? false : data.allEpisode.edges[index + 1].node.name
    const id = edge.node.id
    const slug = edge.node.name.toString().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'')
    
    const nextUrl = next.toString().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'')
    const prevUrl = prev.toString().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'')
    
    //const slug = edge.node.name.replace(/[\W_]/g, "-")

      actions.createPage({
        path: slug,
        component: require.resolve(`./src/templates/episode.js`),
        context: { 
            id: id,
            slug: slug,
            prev: prevUrl,
            next: nextUrl
         },
      })
    })
  }