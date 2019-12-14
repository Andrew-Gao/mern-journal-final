import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Entry = props => (
    <tr>
      <td>{props.entry.username}</td>
      <td>{props.entry.description}</td>
      <td>{props.entry.accomplishments}</td>
      <td>{props.entry.datepick.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.entry._id}>edit</Link> | <a href="#" onClick={() => { props.deleteEntry(props.entry._id) }}>delete</a>
      </td>
    </tr>
  )



export default class EntriesList extends Component {
    constructor(props){
        super(props);

        this.deleteEntry = this.deleteEntry.bind(this);

        this.state = {entries: []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/entries/')
        .then(response => {
            this.setState({ entries: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteEntry(id) {
        axios.delete('http://localhost:5000/entries/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          entries: this.state.entries.filter(el => el._id !== id)
        })
      }
    
    entriesList() {
        return this.state.entries.reverse().map(currententry => {
          return <Entry entry={currententry} deleteEntry={this.deleteEntry} key={currententry._id}/>;
        })
      }

    render(){
      const mystyle = {
        fontFamily : "roboto",
        textAlign : "center"
      };
        return (
            <div>
              <h3 style = {mystyle}>Logged Entries</h3>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Username</th>
                    <th>Accomplishments</th>
                    <th>Gratitude</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { this.entriesList() }
                </tbody>
              </table>
            </div>
          )

    }
}