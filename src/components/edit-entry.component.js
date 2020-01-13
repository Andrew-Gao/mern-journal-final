import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditEntries extends Component {
    constructor(props){
        super(props);
        
        this.onChangeAccomplishments = this.onChangeAccomplishments.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDatepick = this.onChangeDatepick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            accomplishments: '',
            description: '',
            username: '',
            datepick: new Date(),
            users: []
        }
    }
    
    componentDidMount() {
    
    axios.get('http://localhost:5000/entries/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          accomplishments: response.data.accomplishments,
          datepick: new Date(response.data.datepick)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

      
    axios.get('http://localhost:5000/users')
      .then(response => {
        if (response.data.length > 0){
          this.setState({
            users:response.data.map(user => user.username),
          })
        }
      })
        
    }


    onChangeAccomplishments(e){
        this.setState({
            accomplishments: e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangeDatepick(date) {
        this.setState({
          datepick: date
        })
      }

    onSubmit(e){
        e.preventDefault();
        const entry = {
            accomplishments: this.state.accomplishments,
            description: this.state.description,
            username: this.state.username,
            datepick: this.state.datepick
        }

        console.log(entry);

        axios.post('http://localhost:5000/entries/update/'+this.props.match.params.id, entry)
        .then(res => console.log(res.data));

    }

    render(){
        return (
            <div>
      <h3>Edit Entry Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>User: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Accomplishments: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.accomplishments}
              onChange={this.onChangeAccomplishments}
              />
        </div>
        <div className="form-group">
          <label>Things you're grateful for: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.datepick}
              onChange={this.onChangeDatepick}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Entry Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
        )

    }
}