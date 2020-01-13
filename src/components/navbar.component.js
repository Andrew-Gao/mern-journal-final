import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class Navbar extends Component {

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "#373858",
    };

    return (
      <nav className="navbar navbar-dark navbar-expand-lg" style = {mystyle}>
        <Link to="/create" className="navbar-brand" >Journal</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Entries</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Entry Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}