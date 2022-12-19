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

const IndexPage = () => {

  return(
  <Layout>
    <SEO title="Support" />
    <Section>
        <Wrapper>
            <h2>Support Us</h2>
            <Script src="https://app.supercast.com/js/embed.js" />
            <supercast-plan code="993dbcec-93cf-45ce-b981-925fb1828623"></supercast-plan>
        </Wrapper>
    </Section>
  </Layout>
)}

export default IndexPage