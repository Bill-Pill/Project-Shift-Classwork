import { Switch, Route } from 'react-router-dom'
import React from 'react'
import Home from './Home'
import Roster from './Roster'
import Schedule from './Schedule'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      players: [
        { number: 1, name: "Ben Blocker", position: "G" },
        { number: 2, name: "Dave Defender", position: "D" },
        { number: 3, name: "Sam Sweeper", position: "D" },
        { number: 4, name: "Matt Midfielder", position: "M" },
        { number: 5, name: "William Winger", position: "M" },
        { number: 6, name: "Fillipe Forward", position: "F" }
      ]
    }
    
    this.addPlayer = this.addPlayer.bind(this);
  }
  
  addPlayer (player) {
    this.setState({players: this.state.players.concat([player])});
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/roster' render={() => (
            <Roster addPlayer={this.addPlayer} players={this.state.players} />
          )}/>
          <Route path='/schedule' component={Schedule}/>
        </Switch>
      </div>
    )
  }
}

export default App
