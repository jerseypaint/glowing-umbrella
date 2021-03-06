import React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"
import ListenLinks from "../components/listen-links"
import Newsletter from "../components/newsletter"
import Player from "../components/sc-player"

const Break = styled.hr`
  max-width: 600px;
  width: 100%;
  background-color: #e5e5e5;
  margin: 3em auto -3em;
`

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`
const NewEpisodeContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const PageNav = styled.div`
  display: flex;
  justify-content: space-between;

  .svg-inline--fa {
    margin: 0 8px;
  }
`

const prev = css`
  margin-right: auto;
`

const next = css`
  margin-left: auto;
`

const PageNavLink = css`
  display: flex;
  align-items: center;
`

const addLineBreaks = string =>
  string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

const NewEpisode = (props) => (
    <Section>
        <NewEpisodeContent>
          <span></span>
          <h3>{props.title}</h3>
          <Player title={props.title} trackId={props.trackId} />
          <ListenLinks style={{justifyContent: `center`}} />
        </NewEpisodeContent>
        <Break />
    </Section>
)

const Article = (props) => {
  return (
    <Section>
        <Wrapper>
            <article>
              {addLineBreaks(props.body)}  
            </article>
        </Wrapper>
        <PageNav>
          {props.prev !== false && <Link to={props.prev} css={[PageNavLink, prev]}><FontAwesomeIcon icon={faAngleDoubleLeft} color={`black`} />Prev</Link>}
          {props.next !== false && <Link to={props.next} css={[PageNavLink, next]}>Next<FontAwesomeIcon icon={faAngleDoubleRight} color={`black`} /></Link>}
        </PageNav>
    </Section>
)}

const EpisodesPage = ({data, pageContext}) => {
  const { next, prev } = pageContext

  return (
  <Layout>
    <SEO title={data.soundcloudtrack.title} />
    <NewEpisode
      title={data.soundcloudtrack.title}
      trackId={data.soundcloudtrack.soundcloud_id}
    />
    <Article 
      body={data.soundcloudtrack.description}
      prev={prev}
      next={next}
    />
    <Newsletter />
  </Layout>
)}

export default EpisodesPage

export const query = graphql`
  query($slug: String!) {
    soundcloudtrack(permalink: { eq: $slug }) {
      artwork_url
      description
      title
      soundcloud_id
      permalink
    }
  }
`