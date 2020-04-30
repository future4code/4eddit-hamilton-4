import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Header from '../../components/Header'
import { createUser } from '../../actions/user'
import {Body, ContainerLogin, Form} from './styled'




class FormRegister extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: {}
    }
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState ({
      form: {...this.state.form, [name]: value}
    })
  }
  handleSubmmit = (event) => {
    event.preventDefault();
    console.log(this.state.form)
    this.props.createUser(this.state.form)
  }

  render() {
    const {username, email, password} = this.state;

    return (
      <Body>
        <Header showTitle></Header> 
        <ContainerLogin>
          <Form onSubmit={this.handleSubmmit}>
        <TextField
        onChange={this.handleInputChange}
          name="username"
          required
          type="text"
          inputProps={{pattern: "[A-Za-z-_]{3,}", 
          title: "O nome deve conter no mínimo 3 letras"}}    
          label="Nome de usuário"
          value={username}
          />
          <TextField
          onChange={this.handleInputChange}
          name="email"
          required
          type="email"
          label="E-mail"
          value={email}
          />
          <TextField
          onChange={this.handleInputChange}
          name="password"
          required
          type="password"
          label="Senha"            
          value={password}
          /><br/>
          <Button type="submit" variant="contained" color="primary">Cadastrar</Button>        
        </Form>

        </ContainerLogin>
      </Body>
    );
  }
}

const mapDispatchToProps = dispatch => ({ 
  createUser: (body) => dispatch(createUser(body))
})

export default connect (
  null, 
  mapDispatchToProps
)(FormRegister);

