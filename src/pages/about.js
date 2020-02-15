import React from "react"
import { graphql } from 'gatsby'
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"
import Section from "../components/section"
import Newsletter from "../components/newsletter"

const Break = styled.hr`
  width: 600px;
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
        width: 33.33%;
        height: 80%;
    }
    
    .gatsby-image-wrapper {
        min-height: 600px;
        height: auto;
        width: 100%;
    }
`
const RayContent = styled.div`
    flex: 1 1;
    @media (min-width: 767px) {
        margin-left: 2em;
    }
`

const Socials = styled.ul`
    display: flex;
    list-style: none;
    margin-top: 1em;
    li {
        padding: 0 1em;
        border-right: 1px solid #000;
    
        &:last-of-type {
          border: none;
        }
    }
`

const HuContent = styled.div`
    flex: 1 1;
    @media (min-width: 767px) {
        margin-right: 2em;
    }
`

const HuImageWrapper = css`
    @media (min-width: 767px) {
       width: 40%;
    }
`

const centerHeader = css`
    text-align: center;
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
            {documentToReactComponents(props.description, options)}  
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
                <Image fluid={props.image} />
                <Socials>
                    {props.socials.map( social => (
                        <li><a href={social.node.url}>{social.node.name}</a></li>
                        ))}
                </Socials>
            </ImageWrapper>
            <RayContent>
                {documentToReactComponents(props.body, options)}  
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
             {documentToReactComponents(props.body, options)}  
            </HuContent>
            <ImageWrapper css={HuImageWrapper}>
                <Image fluid={props.image} />
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
                description={about.headerDescription.json}
            />
            <AboutRay 
                title={about.aboutRayTitle}
                body={about.aboutRayContent.json}
                image={about.aboutRayImage.fluid}
                socials={data.allContentfulSocialMediaLinks.edges}
            />
            <AboutHU
                title={about.aboutHuTitle}
                body={about.aboutHuContent.json}
                image={about.aboutHuImage.fluid}
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
                json
            }
            aboutRayImage {
                fluid {
                    sizes
                    src
                    srcSet
                  }
            }
            aboutRayTitle
            aboutHuTitle
            aboutHuImage {
                fluid {
                    sizes
                    src
                    srcSet
                  }
            }
            aboutHuContent {
                json
            }
            headerDescription {
                json
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