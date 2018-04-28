import React, { Component } from 'react';
import { Container, Header, Grid, Form, Input, Message, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import instance from '../ethereum/organicChecker';

class Suppliers extends Component {
  state = {
    companyname: '',
    licensenumber: '',
    email: '',
    phone: '',
    errorMessage: '',
    successMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '', successMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      await instance.methods.setSupplier(accounts[0], this.state.companyname, 
        this.state.licensenumber, this.state.email, this.state.phone)
        .send({from: accounts[0]});
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({
      loading: false,
      companyname: '',
      licensenumber: '',
      email: '',
      phone: '',
      successMessage: 'Your submission was successful.'
    });
  };

  render() {
    return (
      <Layout>
        <Container style={{ marginTop: '30px' }}>
          <Header style={{ marginLeft: '10px', fontSize: '50px' }} as='h1'>Suppliers</Header>
          <Header style={{ marginLeft: '10px' }} as='h2'>Register as a supplier. Get more customers by providing them with proof of organic certification.</Header>
          <Header style={{ marginLeft: '10px', marginBottom: '30px' }} as='h3'>Please enter the required fields below. Provide evidence of your certifications and verifications directly to the administrator. You will pay the required "gas" fee.</Header>
          
          <Form style={{ marginLeft: '10px' }} onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage} >
            <Form.Group>
              <Form.Input
                label='Company name'
                placeholder='Company name'
                value={this.state.companyname}
                onChange={event => this.setState({ companyname: event.target.value })}
                width={8}
                required/>
              <Form.Input
                label='License Number'
                placeholder='License Number'
                value={this.state.licensenumber}
                onChange={event => this.setState({ licensenumber: event.target.value })}
                width={8}
                required/>
            </Form.Group>
            <Form.Group>
              <Form.Input
                label='Email'
                placeholder='Email'
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
                width={8}
                required/>
              <Form.Input
                label='Phone number'
                placeholder='Phone number'
                value={this.state.phone}
                onChange={event => this.setState({ phone: event.target.value })}
                width={8}
                required/>
              </Form.Group>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading} type='submit'>Submit</Button>
            <Message success header={this.state.successMessage} />
          </Form>
        </Container>
      </Layout>
    );
  }
}

export default Suppliers;