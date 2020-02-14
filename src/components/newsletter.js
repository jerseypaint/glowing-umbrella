import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

import Section from "./section"

const Grid = styled.div`
    @media (min-width: 767px) {
        display: flex;
        align-items: center;
    }
`
const Content = styled.div`
    flex: 1 1;

    h2 {
        color: #fff;
    }
`

const FormWrapper = styled.form`
    display: flex;
    margin-bottom: 0;

    input {
        border: none;
    }
`

const Button = styled.button`
    background: #000;
    color: #fff;
    border: none;
    cursor: pointer;
`

const Newsletter = () => (
  <Section style={{backgroundColor: `#119DA4`}}>
    <Grid>
        <Content>
            <h2>Subscribe for new releases, thought provoking articles, and industry news</h2>
        </Content>
        <div>
            <FormWrapper>
                <input />
                <Button>Sign Up</Button>
            </FormWrapper>
        </div>
    </Grid>
  </Section>
)
  
  export default Newsletter