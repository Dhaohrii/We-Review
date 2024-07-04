'use client';
import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import "./contact.module.css"
const ContactPage: React.FC = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="mx-auto">
          <form>
            <p className="h4 text-center mb-4">Contact Us</p>
            <div className="grey-text">
              <MDBInput label="Your name" icon="user" group type="text" validate error="wrong" success="right" />
              <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong" success="right" />
              <MDBInput label="Subject" icon="tag" group type="text" validate error="wrong" success="right" />
              <MDBInput type="textarea" rows="2" label="Your message" icon="pencil-alt" />
            </div>
            <div className="text-center">
              <MDBBtn color="primary">Send</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ContactPage;
