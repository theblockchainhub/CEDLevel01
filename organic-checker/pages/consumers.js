import React, { Component } from 'react';
import { Container, Header, Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';
import organicChecker, { getSuppliers } from '../ethereum/organicChecker';

class Consumers extends Component {
  static async getInitialProps() {
    const allSuppliers = await getSuppliers();
    return { allSuppliers }
  }


  renderSuppliers() {
    const suppliers = this.props.allSuppliers.map(supplier => {
      const isCertified = supplier[4];
      const isLabVerified = supplier[5];
      let buttons;

      if (isCertified) {
        if(isLabVerified) {
          buttons = 
          <div className='ui two buttons'>
            <Button basic color='green'>Valid organic certification</Button>
            <Button basic color='green'>Lab verified organic</Button>
          </div>;
        } else {
          buttons = 
          <div className='ui two buttons'>
            <Button basic color='green'>Valid organic certification</Button>
            <Button basic color='red'>NOT lab verified organic</Button>
          </div>;
        }
      }

      if (!isCertified) {
        if (isLabVerified) {
          buttons =
          <div className='ui two buttons'>
            <Button basic color='red'>No Organic certification</Button>
            <Button basic color='green'>Lab verified organic</Button>
          </div>;
        } else {
          buttons =
          <div className='ui two buttons'>
            <Button basic color='red'>No Organic certification</Button>
            <Button basic color='red'>NOT lab verified organic</Button>
          </div>;
        }
      }
      
      return {
        header: supplier[0],
        meta: `License number: ${supplier[1]}`,
        description: `Phone number: ${supplier[3]}`,
        extra: buttons,
        fluid: true
      }
    });
    return <Card.Group items={suppliers} />;
  }

  render() {
    return (
      <Layout>
        <Container style={{ marginTop: '30px' }}>
          <Header style={{ marginLeft: '10px', fontSize: '46px' }} as='h1'>Consumers: You're Empowered.</Header>
          <Header style={{ marginLeft: '10px' }} as='h2'>As a consumer it is your right to know if your food supplier is truly organic.</Header>
          <Header style={{ marginLeft: '10px', marginBottom: '30px' }} as='h3'>Below is a list of every supplier we have on file.</Header>
          {this.renderSuppliers()}
        </Container>
      </Layout>
    );
  }
}

export default Consumers;