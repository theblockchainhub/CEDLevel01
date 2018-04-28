import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default (props) => {
  return (
    <div>
    <Container style={{ marginTop: '30px', minHeight: '750px' }}>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
      </Head>
      <Header />
        {props.children}
    </Container>
    <Footer></Footer>
    </div>
  );
};