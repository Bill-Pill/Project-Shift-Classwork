import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Player from './Player';
import PlayerNew from './PlayerNew';
import FullRoster from './FullRoster';

const Roster = ({players, addPlayer}) => (
  <Switch>    
    <Route path='/roster/new' render={(props) => (
      <PlayerNew props={props} players={players} addPlayer={addPlayer} />
    )}/>
  
    <Route path='/roster/:number' render={(props) => (
      <Player props={props} players={players} />
    )}/>
    
    <Route path='/roster' render={() => (
      <FullRoster players={players} />
    )}/>
  </Switch>
)

export default Roster
