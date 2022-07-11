import React, { Component } from "react";
import axios from "axios";
import Modals from "./Modals";
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";

class User extends Component {
  constructor() {
    super();
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get(`http://localhost:8000/api/users`).then((users) => {
      this.setState({ users: users.data, loading: false });
    });
  }

  deleteUser(id, e) {
    axios.delete(`http://localhost:8000/api/user/${id}`).then((users) => {
      const user = this.state.users.filter((all) => all.id !== id);
      this.setState({ users: user, loading: false });
      // window.location.reload(true)
    });
  }

  render() {
    const loading = this.state.loading;
    
    return (
      <div>
        <section className="row-section">
          <div className="container">
            <div className="row">
              <h2 className="text-center">
                <span>List of Users</span>
              </h2>
            </div>
            {loading ? (
              <div className="row text-center">
                <span className="fa fa-spin fa-spinner fa-4x"></span>{" "}
                <p className="white">Chargement</p>
              </div>
            ) : (
              <div>
                <div className="col-md-10 offset-md-1 row-block">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID#</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Telephone</th>
                        <th scope="col">Age</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {this.state.users.map((user) => (
                      <tbody key={user.id}>
                        <tr>
                          <th scope="row">{user.id}</th>
                         
                          <td>
                            
                              <Link to={`/userinfos/${user.id}`}>{user.prenom}</Link>
                            
                          </td>
                          <td>{user.nom}</td>
                          <td>{user.email}</td>
                          <td>{user.adresse}</td>
                          <td>{user.tel}</td>
                          <td>{user.age}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={(e) => this.deleteUser(user.id, e)}
                            >
                              <i className="fa fa-trash-o"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
        <div className="container d-flex justify-content-center">
          <Modals />
        </div>
      </div>
    );
  }
}
export default User;
