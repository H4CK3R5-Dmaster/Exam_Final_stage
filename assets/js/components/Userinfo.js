import axios from 'axios';
import React, { Component } from 'react';
import { Card } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import ModalAddPosses from './ModalAddPosses';

class Userinfo extends Component {
    constructor() {
        super();
        this.state = { users: [], loading: true };
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        const { id } = this.props.params;
        console.log(id)
        axios.get(`http://localhost:8000/api/user/spec/${id}`).then((users) => {
            this.setState({ users: users.data, loading: false });
            console.log(users.data[0] + " : nom")
        });
    }


    render() {
        const loading = this.state.loading;
        return (
            <div className='container'>
                <h1>Information utilisateur</h1>
                {loading ? (
                    <div className="row text-center">
                        <span className="fa fa-spin fa-spinner fa-4x"></span>{" "}
                        <p className="white">Chargement</p>
                    </div>
                ) : (
                    <div>


                        <div className='container' >

                            <Card style={{ width: '70rem' }}>
                                <Card.Body>
                                    {this.state.users.map((user) => (
                                        <div key={user.id}>
                                            {console.log(user.nom)}
                                            <h1>Nom : {user.nom}</h1>
                                            <h2>Prenom : {user.prenom}
                                                <br />
                                                {user.age >= 18 ? `Age : ${user.age} ans` : `Age : ${user.age} an`}

                                                <br />
                                                email : {user.email}
                                                <br />
                                                adresse : {user.adresse}
                                                <br />
                                                tel : {user.tel}
                                                <br />
                                                date de naissance : {user.birthDate}


                                            </h2>
                                        </div>))}
                                </Card.Body>
                            </Card>
                            <br />
                            {this.state.users.map((user) => (
                                <section className="row-section">
                                    <div className='offset-md-1 row-block'>
                                        <h3>Possession</h3>

                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>Nom</th>
                                                    <th scope='col'>Valeur</th>
                                                    <th scope='col'>Type</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>

                                                    <td>{user.possession ? user.possession.nom : 'Aucune'}</td>
                                                    <td>{user.possession ? user.possession.valeur : 'Aucune'}</td>
                                                    <td>{user.possession ? user.possession.type : 'Aucune'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            ))}


                        </div>
                        <div className="container d-flex justify-content-center">
                            <ModalAddPosses />
                        </div>
                    </div>
                    
                )}
            </div>

        )

    }
}




export default (props) => (<Userinfo {...props} params={useParams()} />);