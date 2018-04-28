import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item href='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>
          <Menu.Item href='consumers' name='consumers' active={activeItem === 'consumers'} onClick={this.handleItemClick} />
          <Menu.Item href='suppliers' name='suppliers' active={activeItem === 'suppliers'} onClick={this.handleItemClick} />
          <Menu.Item href='admin' name='admin' active={activeItem === 'admin'} onClick={this.handleItemClick} />
        </Menu>
      </Segment>
    )
  }
}