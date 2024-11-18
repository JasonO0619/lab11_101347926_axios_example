import React, { Component } from 'react';
import axios from 'axios';

class PersonList extends Component {
    state = {
        persons: []
    };

  
    componentDidMount() {
        fetch(`https://randomuser.me/api/?results=10`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const persons = data.results;
                this.setState({ persons });
            });
    }

    formatPhoneNumber = (number) => {
      return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  };

    render() {
      return (
          <div>
              <h2 style={{ 
                textAlign: "center",
                backgroundColor: "green",
              }}>User List</h2>
              <div>
                  {this.state.persons.map(person => (
                      <div
                          key={person.login.uuid}
                          style={{
                              backgroundColor: "#00bcd4",
                              color: "black",
                              padding: "15px",
                              borderRadius: "50px",
                              margin: "10px 0"
                          }}
                         >
                          <div style={{ display: "flex", alignItems: "center" }}>
                    
                              <img
                                  src={person.picture.large}
                                  alt="Profile"
                                  style={{
                                      borderRadius: "50%",
                                      width: "80px",
                                      height: "80px",
                                      marginRight: "15px"
                                  }}
                              />
                              <h3>
                                  {person.name.title} {person.name.first} {person.name.last}
                              </h3>
                          </div>
                          <p>Username: {person.login.username}</p>
                          <p>Email: {person.email}</p>
                          <p>Gender: {person.gender}</p>
                          <p>Address: {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.country}</p>
                          <p>Phone#: {this.formatPhoneNumber(person.phone.replace(/\D/g, ''))}</p>
                          <p>Cell#: {this.formatPhoneNumber(person.cell.replace(/\D/g, ''))}</p>
                          <p>Birth Date: {new Date(person.dob.date).toLocaleDateString()} ({person.dob.age} years old)</p>
                          <p>Time Zone Description: {person.location.timezone.description}</p>
                          <p>Registered Date: {new Date(person.registered.date).toLocaleDateString()}</p>
                      </div>
                  ))}
              </div>
          </div>
      );
  }
}

export default PersonList;
