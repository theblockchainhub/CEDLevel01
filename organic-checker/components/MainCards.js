import React, { Component } from 'react'
import { Card, Icon, Grid } from 'semantic-ui-react'
import instance from '../ethereum/organicChecker';

const consumers = 'We give consumers a quick and easy way to check if they are buying truly organic food.'
const suppliers = 'Easily add your information to our data base with a self-serivce portal.';
const admin = 'For administrator only. Update the status of a supplier.'

class MainCards extends Component {
  state = {
    supplierCount: '',
  }

  async componentDidMount() {
    const getSupplierCount = await instance.methods.countSuppliers().call();
    this.setState({ supplierCount: getSupplierCount });
  }

  render() {
    return (
      <div style={{ marginTop: '40px' }}>
        <Grid>
          <Grid.Column width={5} style={{ marginLeft: '10px' }}>
            <Card>
              <Card.Content header='Consumers' href='consumers' style={{ fontSize: '30px' }} />
              <Card.Content description={consumers} />
              <Card.Content extra>
                <Icon name='user' />
                Currently we have {this.state.supplierCount} Suppliers on file
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={5}>
            <Card>
              <Card.Content header='Suppliers' href='suppliers' style={{ fontSize: '30px' }} />
              <Card.Content description={suppliers} />
            </Card>
          </Grid.Column>

          <Grid.Column width={5}>
            <Card>
              <Card.Content header='Admin' href='admin' style={{ fontSize: '30px' }} />
              <Card.Content description={admin} />
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default MainCards