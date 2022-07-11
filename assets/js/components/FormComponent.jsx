import React, { Component } from "react";

import { Button, Form, FormGroup, Label, Alert, Input } from "reactstrap";

import axios from "axios";

class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nom: "",

      prenom: "",

      email: "",

      tel: "",

      adresse: "",

      birth: "",

      possession: "",

      errorMessage: null,

      error: false,

      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm(e) {
    e.preventDefault();

    this.setState({
      isLoading: true,

      error: false,

      errorMessage: "",
    });
    const user = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      adresse: this.state.adresse,
      tel: this.state.tel,
      birth: this.state.birth,
      
    };
    let form = new FormData()
    form.append('nom',user.nom)
    form.append('prenom',user.prenom)
    form.append('email',user.email)
    form.append('adresse',user.adresse)
    form.append('tel',user.tel)
    form.append('birth',user.birth)

    axios
      .post(`http://localhost:8000/api/users`, form)

      .then((response) => {
        console.log(response)
        this.setState({
          nom: "",

          prenom: "",

          email: "",

          tel: "",

          adresse: "",

          birth: "",

          

          isLoading: false,

          error: false,

          errorMessage: "",
        });
        window.location.reload(true)
      })
      .catch((err) => {
        this.setState({
          isLoading: false,

          error: true,

          errorMessage: err.errors,
        });
      });
  }

  render() {
    return (
      <div id="register">
        <Form className="form" onSubmit={this.submitForm}>
          <FormGroup>
            <Label for="nom">nom</Label>
            <Input
              type="text"
              name="nom"
              value={this.state.nom}
              onChange={this.handleChange}
              id="nom"
              placeholder="nom"
            />
          </FormGroup>
          <FormGroup>
            <Label for="prenom">prenom</Label>
            <Input
              type="text"
              name="prenom"
              value={this.state.prenom}
              onChange={this.handleChange}
              id="prenom"
              placeholder="prenom"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">email</Label>
            <Input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              id="email"
              placeholder="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="tel">tel</Label>
            <Input
              type="tel"
              name="tel"
              value={this.state.tel}
              onChange={this.handleChange}
              id="tel"
              placeholder="tel"
            />
          </FormGroup>
          <FormGroup>
            <Label for="adresse">adresse</Label>
            <Input
              type="text"
              name="adresse"
              value={this.state.adresse}
              onChange={this.handleChange}
              id="adresse"
              placeholder="adresse"
            />
          </FormGroup>
          <FormGroup>
            <Label for="birth">date de naissance</Label>
            <Input
              type="date"
              name="birth"
              value={this.state.birth}
              onChange={this.handleChange}
              id="birth"
              placeholder="birth"
            />
          </FormGroup>
          
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
export default FormComponent;
