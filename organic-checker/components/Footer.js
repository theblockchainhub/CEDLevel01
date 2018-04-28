import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class MenuExampleInvertedSecondary extends Component {
  render() {

    return (
      <Segment inverted style={{ marginTop: '60px' }}>
        <p style={{ marginLeft: '60px' }}>Organic Checker | Copyright 2018</p>
      </Segment>
    )
  }
}