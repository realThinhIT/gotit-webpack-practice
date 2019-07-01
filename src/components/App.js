import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <img src="/assets/logo.png"></img>
        <img src="/assets/logo.png"></img>
        <img src='/assets/logo.png'></img>
        <img src={'/assets/logo.png'}></img>
      </div>
    );
  }
}