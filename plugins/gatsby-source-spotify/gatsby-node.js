/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.org/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = (_, pluginOptions) => console.log(pluginOptions.clientId)

const axios = require('axios');

const EPISODE_NODE_TYPE = `Episode`

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
  },
  pluginOptions
  ) => {
    const { createNode, touchNode, deleteNode } = actions
    
    const clientId = pluginOptions.clientId
    const clientSecret = pluginOptions.clientSecret
    const auth64 = Buffer.from(clientId + `:`+ clientSecret).toString('base64')
    
    const client = () => {
      
    
        return axios({
                url: 'https://accounts.spotify.com/api/token',
                method: 'post',
                params: {
                grant_type: 'client_credentials'
                },
                headers: {
                'Accept':'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + auth64
                }
            }).then(function(response) {
                return (
                    axios({
                        url: 'https://api.spotify.com/v1/shows/2vClZVAJHI7mZZjVycUXzP/episodes',
                        method: 'get',
                        params: {
                            market: 'US',
                            limit: 50
                        },
                        headers: {
                            'Accept':'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + response.data.access_token
                        }
                    }).then(function(response){
                        response.data
                        return response.data
                    }).catch(function(error){
                        console.log(error)
                    })
                )
            }).catch(function(error) {
            })
        
    }
    
    const data = await client()

    // loop through data and create Gatsby nodes
    data.items.forEach(item =>
      createNode({
        ...item,
        id: createNodeId(`${EPISODE_NODE_TYPE}-${item.id}`),
        parent: null,
        children: [],
        internal: {
          type: EPISODE_NODE_TYPE,
          content: JSON.stringify(item),
          contentDigest: createContentDigest(item),
        },
      })
    )
    return
  }