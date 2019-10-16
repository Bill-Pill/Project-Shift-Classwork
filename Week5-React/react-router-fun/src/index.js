import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <Main />
  </div>
);

const Home = () => (
  <div>
    <h1>Welcome to Our Team Page!</h1>
    <header>
      <h3>
        <Link to={`/roster/`}>View Roster</Link>
      </h3>
      <h3>
        <Link to={`/schedule/`}>Peruse Schedule</Link>
      </h3>
    </header>
  </div>
);

const PlayerAPI = {
  players: [
    { number: 1, name: 'Ben Blocker', position: 'G' },
    { number: 2, name: 'Dave Defender', position: 'D' },
    { number: 3, name: 'Sam Sweeper', position: 'D' },
    { number: 4, name: 'Matt Midfielder', position: 'M' },
    { number: 5, name: 'William Winger', position: 'M' },
    { number: 6, name: 'Fillipe Forward', position: 'F' }
  ],
  all: function() {
    return this.players;
  },
  get: function(id) {
    const isPlayer = p => p.number === id;
    return this.players.find(isPlayer);
  }
};

const FullRoster = () => (
  <div>
    <ul>
      {PlayerAPI.all().map(p => (
        <li key={p.number}>
          <Link to={`/roster/${p.number}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Player = props => {
  const player = PlayerAPI.get(parseInt(props.match.params.number, 10));
  if (!player) {
    return <div>Sorry, but the player was not found</div>;
  }
  return (
    <div>
      <h1>
        {player.name} (#{player.number})
      </h1>
      <h2>Position: {player.position}</h2>
      <Link to="/roster">Back</Link>
    </div>
  );
};

const Roster = () => (
  <Switch>
    <Route exact path="/roster" component={FullRoster} />
    <Route path="/roster/:number" component={Player} />
  </Switch>
);

const Schedule = () => <h1>Schedule</h1>;

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/roster" component={Roster} />
      <Route path="/schedule" component={Schedule} />
    </Switch>
  </main>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);