import React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"
import ListenLinks from "../components/listen-links"
import Newsletter from "../components/newsletter"
import { Component } from "react"
import {Linkify} from "../utils/linkify"

const Grid = styled.div`
  text-align: center;

  @media (min-width: 767px) {
    text-align: left;
    display: flex;
  }
`

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`

const ListenWrapper = styled.div`

  p {
    margin-bottom: 0;
    margin-left: 1em;
  }

  @media (min-width: 767px) {
    display: flex;
    justify-content: center;
  }
`

const BreakTop = styled.hr`
  max-width: 600px;
  width: 100%;
  background-color: #e5e5e5;
  margin: -3em auto 3em auto;
`

const BreakBottom = styled.hr`
  max-width: 600px;
  width: 100%;
  background-color: #e5e5e5;
  margin: 3em auto -3em auto;
`

const NewEpisodeGrid = css`
  max-width: 800px;
  margin: 0 auto;
`

const NewEpisodeContent = styled.div`
  flex: 1 0;

  @media (min-width: 767px) {
    margin-left: 1em;
  }

  p {
    margin-bottom: 0;
  }
`

const TrackImage = styled.img`
  width: auto;
  max-width: 200px;
  align-self: flex-start;
`
const AllEpisodesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: flex-end;

  h2 {
    margin-right: 1em;
  }
`

const FormWrapper = styled.div`
    input {
      border: none;
      border-bottom: 1px solid #000;
      width: calc(100% - 1em);
    }
`

const SearchForm = styled.form`
    display: flex;

    display: none;
`

const SearchButton = styled.button`
    background: #fff;
    border: none;
    color: #000;
    cursor: pointer;

    &:hover {
      color: #119DA4;

      svg {
        color: #119DA4;
      }
    }

`
const AllEpisodesList = styled.div`
  text-align: center;
  @media (min-width: 767px) {
    text-align: left;
  }
`

const EpisodeMeta = styled.div`

  @media (min-width: 767px) {
    padding: 0 1em;
  }

  p {
    margin-bottom: 6px;
  }
`

const EpisodeDescription = styled.div`

`

const Episode = styled.div`
  
  padding: 1em;

  &:nth-of-type(odd) {
    background-color: #fafafa;
  }

  @media (min-width: 767px) {
    display: flex; 
  }
`

const Button = styled.button`
  margin: 1em auto;
  display: block;
  padding: .7em 1em;
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  color: #000;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  &:disabled {
    border:none;
    color: #bebebe;

    &:hover {
      background-color: transparent;
      border: none;
      color: #bebebe;
    }
  }
`

const Bold = ({ children }) => <span>{children}</span>
const Text = ({ children }) => <p>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
  renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
}

const Header = (props) => (
  <Section>
    <Wrapper>
      <h2>{props.title}</h2>
      <div>
            {documentToReactComponents(props.body, options)}  
          </div>
    </Wrapper>
    <ListenWrapper>
      <p>Other ways to listen:</p><ListenLinks />
    </ListenWrapper>
  </Section>
)

const NewEpisode = (props) => {
  
  function truncate(str) {
    return str.length > 200 ? str.substring(0, 200) + "..." : str;
  }

  return (
    <Section>
      <BreakTop />
        <Grid css={NewEpisodeGrid}>
            <TrackImage src={props.image} />
            <NewEpisodeContent>
              <span></span>
              <h3><Link to={`/${props.link}`}>{props.title}</Link></h3>
              <p> {truncate(props.description)} ... <Link to={props.link}>Listen Now</Link></p>
            </NewEpisodeContent>
        </Grid>
      <BreakBottom />
    </Section>
  )
}

class AllEpisodes extends Component {

  constructor(props) {
    super(props)
    this.state = {
     chunksLoaded: 1,
     isLoading: false,
     allLoaded: false,
    }
  }

  renderEpisodes = () => {
   

    let { chunksLoaded } = this.state
    let epArray = this.props.tracks

    let chunks = _.chunk(epArray, 10)
    let renderChunks = []

    for (let i = 0; i < chunksLoaded; i++ ) {
      renderChunks.push(chunks[i])
    }

    let flatRenderChunks = _.flatten(renderChunks)

    function truncate(str, num) {
      return str.length > num ? str.substring(0, num) + "..." : str;
    }

    function truncateDate(str, num) {
      return str.length > num ? str.substring(0, num) : str;
    }

    function timeConversion(millisec) {

      let hours = (millisec / (1000 * 60 * 60))
      let absoluteHours = Math.floor(hours);
      let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

      let minutes = (hours - absoluteHours) * 60
      let absoluteMinutes = Math.floor(minutes);
      let m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

      let seconds = (minutes - absoluteMinutes) * 60
      let absoluteSeconds = Math.floor(seconds);
      let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

      return h + `:` + m + `:` + s
  }


    return flatRenderChunks.map( track => (
      <Episode key={track.node.id}>
          <TrackImage src={track.node.images[0].url} />
          <EpisodeMeta>
              <p>{truncateDate(track.node.release_date, 10)}</p>
              <p>{timeConversion(track.node.duration_ms)}</p>
          </EpisodeMeta>
          <EpisodeDescription>
              <h3><Link to={`/${Linkify(track.node.name)}`}>{track.node.name}</Link></h3>
              <p>{truncate(track.node.description, 200)}</p>
          </EpisodeDescription>
      </Episode>
      )
    )
  }

  loadMore = () => {
    let { chunksLoaded } = this.state
    let epArray = this.props.tracks
    let allLoaded = (chunksLoaded + 1) * 10 >= epArray.length
    console.log((chunksLoaded + 1) * 10)
    console.log(epArray.length)
    this.setState({ chunksLoaded: chunksLoaded + 1, allLoaded: allLoaded })
  }
  
  render () {
    let { allLoaded } = this.state

  return (

    <Section>
        <AllEpisodesHeader>
          <h2>{this.props.title}</h2>
          <FormWrapper>
            <SearchForm>
              <input />
              <SearchButton type={`submit`}><FontAwesomeIcon icon={faSearch} color={`black`} /></SearchButton>
            </SearchForm>
          </FormWrapper>
        </AllEpisodesHeader>
        <AllEpisodesList>

        {this.renderEpisodes()}

            <Button 
              type={`button`} 
              onClick={this.loadMore} 
              disabled={allLoaded}
                >{allLoaded ? 'No More Episodes' : 'Load More'}</Button>
        </AllEpisodesList>
    </Section>
)}}

const EpisodesPage = ({data}) => {
  return (
    <Layout>
    <SEO title="Episodes" />
    <Header 
      title={data.contentfulEpisodesPage.headerTitle}
      body={data.contentfulEpisodesPage.headerBody.json}
    />
    <NewEpisode
      image={data.episode.images[0].url}
      title={data.episode.name}
      description={data.episode.description}
      link={Linkify(data.episode.name)}
      />
    <AllEpisodes 
      title={`More Episodes`}
      tracks={data.allEpisode.edges}
    />
    <Newsletter />
  </Layout>
)}

export default EpisodesPage

export const query = graphql`
  query EpisodesData {
    contentfulEpisodesPage {
      headerTitle
      headerBody {
        json
      }
    }
    episode {
      name
      description
      images {
        url
      }
      id
    }
    allEpisode(skip: 1) {
      edges {
        node {
          images {
            url
          }
          description
          release_date
          duration_ms
          name
          id
        }
      }
    }
  }
`