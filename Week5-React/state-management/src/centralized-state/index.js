import React from 'react';
import ReactDOM from 'react-dom';
import { onUpdate, forceUpdate, sendEvent } from './state';

class Hello extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    // Check out https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt
    // for more details. Essentially, it asks the user for a value and returns
    // it as a string, or `null` if they cancelled.
    const newName = window.prompt('Who would you like to greet?') || 'N/A';

    sendEvent('changeName', newName);
  }

  render () {
    return (
      <h1 onClick={this.handleClick}>Hello, {this.props.name}!</h1>
    );
  }
}
// Cache the element we'll be rendering to.
const root = document.querySelector('#root');

// When the state changes, re-render our app!
onUpdate((state) => {
  ReactDOM.render(
    <Hello name={state.name} />,
    root
  );
});

// Trigger the initial update so our app will render for the first time.
forceUpdate();