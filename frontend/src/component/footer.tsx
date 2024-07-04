"use client";

import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import Link from 'next/link';
import "./footer.css"

const Footer: React.FC = () => {
  return (
    <MDBFooter bgColor='light' className='footer text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>


        <div className='footer-links'>
          <Link href='#!' passHref>
            <span className='text-reset me-4'>
              <MDBIcon fab icon="facebook-f" />
            </span>
          </Link>
          <Link href='#!' passHref>
            <span className='text-reset me-4'>
              <MDBIcon fab icon="twitter" />
            </span>
          </Link>
          <Link href='#!' passHref>
            <span className='text-reset me-4'>
              <MDBIcon fab icon="google" />
            </span>
          </Link>
          <Link href='#!' passHref>
            <span className='text-reset me-4'>
              <MDBIcon fab icon="instagram" />
            </span>
          </Link>
          <Link href='#!' passHref>
            <span className='text-reset me-4'>
              <MDBIcon fab icon="linkedin" />
            </span>
          </Link>
          <Link href='#!' passHref>
            <span className='text-reset me-4'>
              <MDBIcon fab icon="github" />
            </span>
          </Link>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='footer-content mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                We Review
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <Link href='/contact' passHref>
                  <span className='text-reset'>Contact</span>
                </Link>
              </p>
              <p>
                <Link href='/restaurant' passHref>
                  <span className='text-reset'>Restaurant</span>
                </Link>
              </p>
              <p>
                <Link href='/coffee' passHref>
                  <span className='text-reset'>Coffee</span>
                </Link>
              </p>
              <p>
                <Link href='/bar' passHref>
                  <span className='text-reset'>Bar</span>
                </Link>
              </p>
              <p>
                <Link href='/aboutus' passHref>
                  <span className='text-reset'>About Us</span>
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='footer-text'>
        © {new Date().getFullYear()} We Review
      </div>
    </MDBFooter>
  );
};

export default Footer;
