import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Layout from '../components/Layout';
import MainCards from '../components/MainCards';

class Organics extends Component {
  render() {
    return (
      <Layout>
        <Container style={{ marginTop: '30px' }}>
          <Header style={{ marginLeft: '15px', fontSize: '50px' }} as='h1'>Organic Checker</Header>
          <Header style={{ marginLeft: '15px' }} as='h2'>Fight Organic Fraud</Header>
          <Header style={{ marginLeft: '15px' }} as='h3'>We are a blockchain service that allows suppliers to prove their organic certification and third-party lab verfication. And it allows consumers to check if their food suppliers are truly organic.</Header>
          <MainCards></MainCards>
        </Container>
      </Layout>
    );
  }
}

export default Organics;