import React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle  } from '@fortawesome/free-regular-svg-icons'
import { faCaretRight  } from '@fortawesome/free-solid-svg-icons'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"
import ListenLinks from "../components/listen-links"
import Newsletter from "../components/newsletter"


const Content = styled.div`
  max-width: 600px;
`
const InnerHero = styled.div`
  padding: 2em;
  background-color: #fff;
  margin-bottom: 1em;
  position: relative;
`
const NewTag = styled.span`
  position: absolute;
  top: -10px;
  left: -10px;
  background-color: #000;
  color: #fff;
  padding: 2px 5px;
  text-transform: uppercase;
`

const Grid = styled.div`
  @media (min-width: 767px) {
    display: flex;
  }
`

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`
const Topics = styled.ul`
  li {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    font-weight: 700;

    .svg-inline--fa {
      height: 1.2em;
    }
  }
`

const bold = css`
  font-weight: 700;
`

const heroContent = css`
  margin-left: auto;
`

const aboutContent = css`
  margin-right: 2em;
`

const aboutGrid = css`
  justify-content: space-between;
  align-items: center;
`

const button = css`
  display: inline-block;
  margin: 0 0 2em 0;
  padding: .7em 1em;
  border: 1px solid #000;
  border-radius: 6px;
  background-color: #fff;
  color: #000;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`

const newTrack = css`
  display: flex;
  align-items: center;
  text-decoration: none;

  h2 {
    font-size: 1.4em;
    margin-bottom: 0;
    transition: all 200ms;

    &:hover {
      color: #119DA4;
    }
  }

  .svg-inline--fa {
    height:50px;
    width: 50px;

    transition: all 200ms;
    &:hover {
      color: #119DA4;
    }
    
  }
`

const Bold = ({ children }) => <span css={bold}>{children}</span>
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

const Hero = (props) => {
  return (
    <Section style={props.style}>
      <Content css={heroContent}>
        <InnerHero>  
          <h1>{props.title}</h1>
          <div>
            {documentToReactComponents(props.body, options)}  
          </div>
        </InnerHero>
        <InnerHero>
          <NewTag>New</NewTag>
          <Link to={props.link} css={newTrack}>
            <h2>{props.trackTitle}</h2>
            <FontAwesomeIcon icon={faPlayCircle} color={`black`} />
          </Link>
        </InnerHero>
      </Content>
    </Section>
  )
}
const ViewEpisodes = (props) => {
    return (
  <Section>
    <Wrapper>
      <h2>{props.title}</h2>
      <div>
          {documentToReactComponents(props.body, options)}  
      </div>
      <Link to="/episodes" css={button}>View Episodes</Link>
    </Wrapper>
    <ListenLinks style={{justifyContent: `center`}} />
  </Section>
)}

const About = (props) => {
  
  return (
  <Section>
    <Grid css={aboutGrid}>
      <Content css={aboutContent}>
        <h2>{props.title}</h2>
        <div>
          {documentToReactComponents(props.body, options)}  
        </div>
      </Content>
      <Topics className={`fa-ul`}>
        {props.items.map( item => (
        <li><FontAwesomeIcon icon={faCaretRight} color={`#119DA4`} listItem />{item}</li>
          ))}
      </Topics>
    </Grid>
  </Section>
)}



const IndexPage = ({data}) => {
  const home = data.contentfulHomePage

  return(
  <Layout>
    <SEO title="Home" />
    <Hero
      style={{backgroundImage: `url(${home.heroImage.fluid.src})`}}
      title = {home.heroTitle}
      body = {home.heroBody.json}
      trackTitle = {data.episode.name}
      link = {data.episode.id} 
        />

    <ViewEpisodes 
      title={home.viewEpisodesTitle}
      body={home.viewEpisodesBody.json}
        />
    <About
      title={home.aboutTitle}
      body={home.aboutBody.json} 
      items={home.aboutTopicList}
        />
    <Newsletter />
  </Layout>
)}

export default IndexPage

export const query = graphql`
  query IndexData  {
    contentfulHomePage {
      aboutTitle
      aboutTopicList
      heroBody {
        json
      }
      heroTitle
      heroImage {
        fluid(maxWidth: 1920) {
          src
        }
      }
      viewEpisodesTitle
      viewEpisodesBody {
        json
      }
      aboutBody {
        json
      }
    }
    episode {
      name
    }
  }
`


