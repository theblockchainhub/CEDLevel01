import React, { Component } from 'react';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import instance from '../ethereum/organicChecker';
import { getSuppliers } from '../ethereum/organicChecker';

class Admin extends Component {
  state = {
    activeItem: 'admin',
    licensenumber: '',
    errorMessage: '',
    successMessage: '',
    loading: false
  }

  findHexAddressFromLicenseNumber = async (licenseNumber) => {
    let result;
    const allSuppliers = await instance.methods.getAllSuppliers().call();

    const allSuppliersMap = allSuppliers.map(async address => {
      const details = await instance.methods.getSupplierByAddress(address).call();
      return {
        address,
        licenseNumber: details[1]
      }
    });

    const awaitedSuppliers = await Promise.all(allSuppliersMap);

    awaitedSuppliers.forEach(supplier => {
      if (supplier.licenseNumber === licenseNumber) {
        result = supplier.address;
      }
    });
 
    return result;
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '', successMessage: '' });
    const supplierHexAddress = await this.findHexAddressFromLicenseNumber(this.state.licensenumber);

    try {
      const accounts = await web3.eth.getAccounts();

      await instance.methods.updateSupplier(supplierHexAddress, this.state.certvalue === 'true', 
        this.state.verifiedvalue === 'true')
        .send({from: accounts[0]});

        this.setState({
          loading: false,
          licensenumber: '',
          certvalue: undefined,
          verifiedvalue: undefined,
          successMessage: 'Your submission was successful.'
        });

    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
  };

  certHandleChange = (e, { certvalue }) => this.setState({ certvalue })
  verifiedHandleChange = (e, { verifiedvalue }) => this.setState({ verifiedvalue })

  componentDidMount() {
    this.setState({ activeItem: 'admin' })
  }

  render() {
    const { certvalue } = this.state;
    const { verifiedvalue } = this.state;
    return (
      <Layout>
        <Container style={{ marginTop: '30px' }}>
          <Header style={{ marginLeft: '10px', fontSize: '50px' }}as='h1'>Admin</Header>
          <Header style={{ marginLeft: '10px' }} as='h2'>For the administrator only. Your transaction will fail if you are not the administrator.</Header>
          <Header style={{ marginLeft: '10px', marginBottom: '30px' }} as='h3'>Update the certifications and lab verifications here. Gas will be required.</Header>
            
          <Form style={{ marginLeft: '10px' }} onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
            <Form.Group>
              <Form.Input
                label='Supplier license number'
                placeholder='Supplier license number'
                value={this.state.licensenumber}
                onChange={event => this.setState({ licensenumber: event.target.value })}
                width={8}
                required/>
            </Form.Group>
            <Form.Group inline>
              <label>Organic Certification</label>
              <Form.Radio
                label='Certified'
                certvalue='true'
                checked={certvalue === 'true'}
                onChange={this.certHandleChange} />
              <Form.Radio
                label='Not certified'
                certvalue='false'
                checked={certvalue === 'false'}
                onChange={this.certHandleChange} />
            </Form.Group>
            <Form.Group inline>
              <label>3rd Party Lab Verified</label>
              <Form.Radio
                label='Lab verified'
                verifiedvalue='true'
                checked={verifiedvalue === 'true'}
                onChange={this.verifiedHandleChange} />
              <Form.Radio
                label='No lab verification'
                verifiedvalue='false'
                checked={verifiedvalue === 'false'}
                onChange={this.verifiedHandleChange} />
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

export default Admin;