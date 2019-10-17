import React, { Component } from "react";
import ReactDOM from "react-dom";

// Setup the context object for our user information
const UserContext = React.createContext();

//grab the Consumer & Provider off of the context instance
//each of these will have a context property that will contain the state we need
//alternatively, we could use <UserContext.Consumer /> or <UserContext.Provider />
const Consumer = UserContext.Consumer;
const Provider = UserContext.Provider;

class Hello extends Component {
  render() {
    return (
      <h1>
        Hello, <IsItMe />!
      </h1>
    );
  }
}

class IsItMe extends Component {
  render() {
    return <YoureLookingFor />;
  }
}

class YoureLookingFor extends Component {
  render() {
    return (
      // Create a consumer of the context that will subscribe to changes for the value
      <Consumer>
        {({ isItLionel }) => {
          if (isItLionel === true) {
            return <span>Lionel</span>;
          } else {
            return <span>You</span>;
          }
        }}
      </Consumer>
    );
  }
  3;
}

// This is a simpler implementation where you can programmatically access the context object and do what you want with it.
// class YoureLookingFor extends Component {
//   static contextType = UserContext;
//   render () {
//     if (this.context.isItLionel === true) {
//       return (
//         <span>Lionel</span>
//       );
//     } else {
//       return (
//         <span>You</span>
//       )
//     }
//   }
// }

// Cache the element we'll be rendering to.
const root = document.querySelector("#root");

// Setup the provider with the default values
//Note that we're passing an object as the value prop to the Provider, rather than just a boolean or single value. In doing this,
//we're able to pass multiple properties to the single value prop:
//i.e. value={{ isItLionel: true, isHandsome: false, instruments: ['piano', 'vocals', 'saxophone'] }}
//we would then have access to all of these properties via context
ReactDOM.render(
  <Provider value={{ isItLionel: true }}>
    <Hello />
  </Provider>,
  root
);
