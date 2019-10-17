import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  render () {
    return (
      <h1>Hello, <IsItMe isItLionel={true}/>!</h1>
    );
  }
}

class IsItMe extends React.Component {
  render () {
    return (
      <YoureLookingFor isItLionel={this.props.isItLionel}/>
    );
  }
}

class YoureLookingFor extends React.Component {
  render () {
    if (this.props.isItLionel === true) {
      return (
        <span>Lionel</span>
      );
    } else {
      return (
        <span>You</span>
      )
    }
    

  }
}

// Cache the element we'll be rendering to.
const root = document.querySelector('#root');

ReactDOM.render(
  <Hello/>,
  root
);