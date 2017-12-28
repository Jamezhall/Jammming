import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import './Header.css';
import logo from './logo.svg';

export class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <img src={logo} className="App-logo" alt="jammming v2" />
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <FontAwesomeIcon icon="info-circle" transform="shrink-5 up-16"/>
        </div>
      </header>
    );
  }
}