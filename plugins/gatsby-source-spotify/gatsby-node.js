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
exports.onPreInit = (_, pluginOptions) => console.log("Loaded Spotify source plugin")

const axios = require('axios');
const EPISODE_NODE_TYPE = `Episode`

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
  },   pluginOptions ) => {
    const { createNode, touchNode, deleteNode } = actions

    let url = `https://api.spotify.com/v1/shows/2vClZVAJHI7mZZjVycUXzP/episodes`
    const episodes = []

    const clientId = pluginOptions.clientId
    const clientSecret = pluginOptions.clientSecret
    const auth64 = Buffer.from(clientId + `:`+ clientSecret).toString('base64')

    const buildArray = (response) => {
      episodes.push(...response.data.items)
    
      if (response.data.next !== null) {
        return client(response.data.next)
      }
    
      return episodes
    }
    
    const request = (response, url) => {
      return axios({
        url: url,
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
      }).then((response) => {
        return buildArray(response)
      }).catch(function(error){
        console.log(error)
      })
    }
    
    const client = (url) => {
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
            }).then((response) => {
    
              return request(response, url)
            
            }).catch(function(error) {
              console.log(error)
            })
    }
    
    const data = await client(url)

    if (data) {
      console.log(data.length)
    } else {
      console.log(`No Data?`)
    }

    // loop through data and create Gatsby nodes
    data.forEach(item =>
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