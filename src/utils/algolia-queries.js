const indexName = `Episodes`

const episodeQuery = `{
  allEpisode {
    edges {
      node {
        id
        uri
        description
        name
        internal {
          contentDigest
        }
      }
    }
  }
}`

function episodeToAlgoliaRecord({ node: { id,
  uri,
  description,
  name, internal: { contentDigest } } }) {
  return {
    objectID: id,
    uri,
    description,
    name,
    internal: { contentDigest }
  }
}

const queries = [
  {
    query: episodeQuery,
    transformer: ({ data }) => data.allEpisode.edges.map(episodeToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`description:20`] },
  },
]

module.exports = queries

