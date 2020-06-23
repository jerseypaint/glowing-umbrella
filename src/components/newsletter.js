import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"

import Section from "./section"

const Grid = styled.div`
    text-align: center;
`
const Content = styled.div`
    flex: 1 1;

    h2 {
        color: #fff;
    }
`

const FormWrapper = styled.form`
    margin-bottom: 0;

    input {
        border: none;
    }
`

const Button = styled(Link)`
    display: inline-block;
    margin: 0 0 2em 0;
    padding: .7em 1em;
    border: 1px solid #000;
    border-radius: 6px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    font-weight: 700;

    &:hover {
        background-color: #212121;
        color: #fff;
        border-color: #212121;
    }
`

const Newsletter = () => (
  <Section style={{backgroundColor: `#119DA4`}}>
    <Grid>
        <Content>
            <h2>Want to be on the show? Have topic suggestions? I'd love to hear from you!</h2>
        </Content>
        <div>
            <Button to={`/contact`}>Contact Us</Button>
        </div>
    </Grid>
  </Section>
)
  
  export default Newsletter