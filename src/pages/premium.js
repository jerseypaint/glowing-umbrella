import React from "react"
import { Script } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"
import styled from "@emotion/styled"

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`
const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  @media (min-width: 640px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2rem;
      margin-top: 4rem;
  }
`

const IndexPage = () => {

  return(
  <Layout>
    <SEO title="Support" />
    <Section>
      <Wrapper>
        <h2>Support Us</h2>
        <Script src="https://healthunchained.supercast.com/js/embed.js" />
      </Wrapper>
      <div className="container">
      <Grid>
        <supercast-plan code="993dbcec-93cf-45ce-b981-925fb1828623"></supercast-plan>
        <supercast-plan code="e048930f-c556-4365-98e0-55c6857646ce"></supercast-plan>
      </Grid>
      </div>
    </Section>
  </Layout>
  )
}

export default IndexPage