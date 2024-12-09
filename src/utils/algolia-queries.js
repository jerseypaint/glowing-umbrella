const indexName = `Episodes`

const episodeQuery = `{
  allEpisode {
    edges {
      node {
        id
        uri
        description
        name
      }
    }
  }
}`

function episodeToAlgoliaRecord({ node: { id,
  uri,
  description,
  name } }) {
  return {
    objectID: id,
    uri,
    description,
    name
  }
}

const queries = [
  {
    query: episodeQuery,
    transformer: ({ data }) => data.allEpisode.edges.map(episodeToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries

