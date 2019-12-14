import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar.component"
import EntriesList from "./components/entries-list.component";
import EditEntry from "./components/edit-entry.component";
import CreateEntry from "./components/create-entry.component";
import CreateUser from "./components/create-user.component";



function App() {
  return (
    <Router>
      <div className = "container">
        <Navbar />
        <br/>
        <Route path="/" exact component={EntriesList} />
        <Route path="/edit/:id" component={EditEntry} />
        <Route path="/create" component={CreateEntry} />
        <Route path="/user" component={CreateUser} />
        </div>
    </Router>
  );
}

export default App;
