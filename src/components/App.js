import React from 'react';
import image from '../assets/logo.png';

console.log(image);

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hi</h1>

        <img src={image} />
      </div>
    );
  }
}