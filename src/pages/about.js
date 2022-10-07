import React from "react"
import { graphql } from 'gatsby'
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import Section from "../components/section"
import Newsletter from "../components/newsletter"

const Break = styled.hr`
  max-width: 600px;
  background-color: #119DA4;
  margin: 1em auto 3em;
`

const Wrapper = styled.div`
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
`

const Grid = styled.div`
    @media (min-width: 767px) {
        display: flex;
    }    
`

const ImageWrapper = styled.div`
    height: 100%;

    @media (min-width: 767px) {
        height: 80%;
        width: 100%;
        max-width: 40%;
        flex: 1 0 auto;
    }
    
    .gatsby-image-wrapper {
        min-height: 600px;
        height: auto;
        width: 100%;
    }
`
const RayContent = styled.div`
    flex: 0 1 auto;
    @media (min-width: 767px) {
        margin-left: 2em;
    }
`

const Socials = styled.ul`
    display: flex;
    flex-flow: row wrap;
    list-style: none;
    margin-top: 1em;
    margin-left: 0;
    li {
        padding: 0 1em;
        border-right: 1px solid #000;
    
        &:last-of-type {
          border: none;
        }
    }
`

const HuContent = styled.div`
    flex: 0 1 auto;
    @media (min-width: 767px) {
        margin-right: 2em;
    }
`

const HuImageWrapper = css`
    @media (min-width: 767px) {
       width: 100%;
       max-width: 40%;
       flex: 1 0 auto;
    }
`

const centerHeader = css`
    text-align: center;
`

const Bold = ({ children }) => <span>{children}</span>
const Text = ({ children }) => <p>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
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
        {renderRichText(props.description, options)} 
        </div>
      </Wrapper>
    </Section>
  )


const AboutRay = (props) => (
    <Section>
        <h2 css={centerHeader}>{props.title}</h2>
        <Break />
        <Grid>
            <ImageWrapper>
                <GatsbyImage image={props.image.gatsbyImageData} alt={props.image.alt} />
                <Socials>
                    {props.socials.map( social => (
                        <li><a href={social.node.url}>{social.node.name}</a></li>
                        ))}
                </Socials>
            </ImageWrapper>
            <RayContent>
                {renderRichText(props.body, options)}
                
            </RayContent>
        </Grid>
    </Section>
)

const AboutHU = (props) => (
    <Section style={{backgroundColor: `#fafafa`}}>
        <h2 css={centerHeader}>{props.title}</h2>
        <Break />
        <Grid>
            <HuContent>
                {renderRichText(props.body, options)}
            </HuContent>
            <ImageWrapper css={HuImageWrapper}>
                <GatsbyImage image={props.image.gatsbyImageData} alt={props.image.alt} />
            </ImageWrapper>
        </Grid>
    </Section>
)

const About = ({data}) => {
    const about = data.contentfulAboutPage
    
    return (
        <Layout>
            <SEO title="About" />
            <Header 
                title={about.headerTitle}
                description={about.headerDescription}
            />
            <AboutRay 
                title={about.aboutRayTitle}
                body={about.aboutRayContent}
                image={about.aboutRayImage}
                socials={data.allContentfulSocialMediaLinks.edges}
            />
            <AboutHU
                title={about.aboutHuTitle}
                body={about.aboutHuContent}
                image={about.aboutHuImage}
            />
            <Newsletter />
        </Layout>
    )
}

export default About

export const query = graphql`
    query AboutData {
        contentfulAboutPage {
            headerTitle
            aboutRayContent {
                raw
            }
            aboutRayImage {
                gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                )
                title
            }
            aboutRayTitle
            aboutHuTitle
            aboutHuImage {
                gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                )
                title
            }
            aboutHuContent {
                raw
            }
            headerDescription {
                raw
            }
        }
        allContentfulSocialMediaLinks {
            edges {
              node {
                name
                url
              }
            }
          }
    }  
`