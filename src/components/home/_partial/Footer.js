import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-dark mt-auto text-white'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy;
            <a
              href='https://github.com/Asraf2asif'
              target='_blank'
              rel='noreferrer'
            >
              asraf2asif
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
