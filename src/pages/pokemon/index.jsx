import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router'

import PokemonHome from './home'
import PokemonUpdate from './update'
import PokemonDetail from './detail'

export default class Pokemon extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/pokemon' component={PokemonHome} />
        <Route path='/pokemon/update' component={PokemonUpdate} />
        <Route path='/pokemon/detail' component={PokemonDetail} />
        <Redirect to='/pokemon' />
      </Switch>
    )
  }
}
