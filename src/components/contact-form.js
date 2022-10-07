import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

const Form = styled.form`
  display: block;
`
const Label = styled.label`
  display: block;
    p {
      margin-bottom: 4px;
    }
`

const button =css`
  display: inline-block;
  margin: 0 0 1em 0;
  padding: .7em 1em;
  border: 1px solid #000;
  border-radius: 6px;
  background-color: #fff;
  color: #000;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`

const fields = css`
  display: block;
  border: 1px solid #D8D8D8;
  padding: 7px;
  margin-bottom: 1em;
  width: 100%;
`

const ContactForm = (props) => (
  <Form name={props.name} method="post" netlify-honeypot="bot-field" data-netlify="true" id={props.name} className={props.className} >
    <input css={fields} type="hidden" name="bot-field" />
    <input css={fields} type="hidden" name="form-name" value={props.name} />
    <Label>
      <p>Name:</p>
      <input css={fields} type="text" name="name" id="name" placeholder="John Doe" />
    </Label>
    <Label>
    <p>Email:</p>
      <input css={fields} type="email" name="email" id="email" placeholder="johndoe@healthcompany.com" />
    </Label>
    <Label>
    <p>Message:</p>
      <textarea css={fields} name="message" id="message" rows="5" placeholder="A brief message about why you are contacting us." />
    </Label>
    <button css={button} type="submit">Contact Us</button>
  </Form>
  )

  export default ContactForm
