import React from "react"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"
import Form from "../components/contact-form"

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
`

const Contact = ({data}) => (
  <Layout>
    <SEO title="Contact" />
    <Section className="Contact">
      <Wrapper>
        <h2>Contact us</h2>
        <p>asdasd</p>
        <Form />
      </Wrapper>
    </Section>
  </Layout>
)

export default Contact
