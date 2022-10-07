import React from "react"
import styled from "@emotion/styled"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"
import Form from "../components/contact-form"

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
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

const Contact = ({data}) => (
  <Layout>
    <SEO title="Contact" />
    <Section className="Contact">
      <Wrapper>
        <h2>{data.contentfulContactPage.headerTitle}</h2>
        <div>
          {renderRichText(data.contentfulContactPage.headerBody, options)} 
          </div>
        <Form name={`Contact`} method="post" netlify-honeypot="bot-field" data-netlify="true" />
      </Wrapper>
    </Section>
  </Layout>
)

export default Contact

export const query = graphql`
  query ContactData {
    contentfulContactPage {
      headerTitle
      headerBody {
        raw
      }
    }
  }
`