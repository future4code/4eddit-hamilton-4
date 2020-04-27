import React, { Component } from "react";
import styled from 'styled-components'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'
import Header from '../../components/Header'
import { createUser } from '../../actions/user'

const Body = styled.div `
  width: 100vw;
  height: 100vh;
  background-color: #DAE0E6;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ContainerLogin = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 500px;
  width: fit-content;
  border: 2px solid #878a8c;
  height: fit-content;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 5px;
`
const Form = styled.form `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`

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
        <Header/>
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
          />
          <Button type="submit">Cadastrar</Button>        
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

