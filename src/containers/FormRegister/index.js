import React, { Component } from "react";
import styled from 'styled-components'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'


const Body = styled.div `
  width: 100vw;
  height: 100vh;
  background-color: #DAE0E6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ContainerLogin = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 300px;
  width: 40vw;
  border: 1px solid black;
  height: fit-content;
  padding: 20px;
  box-sizing: border-box;
`
const Form = styled.form `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`



class FormRegister extends Component {
  render() {
    const { goToListPosts } = this.props
    return (
      <Body>
        <ContainerLogin>
          <Form>
        <TextField
          name="username"
          required
          type="text"
          inputProps={{pattern: "[A-Za-z-_]{3,}", 
          title: "O nome deve conter no mínimo 3 letras"}}    
          label="Nome de usuário"
          // onChange={this.handleInputChange}
          // value={this.state.form.name || "" 
          />
          <TextField
          name="email"
          required
          type="email"
          label="E-mail"
          // onChange={this.handleInputChange}
          // value={this.state.form.name || "" 
          />
          <TextField
          name="password"
          required
          type="password"
          label="Senha"            
          // onChange={this.handleInputChange}
          // value={this.state.form.name || "" 
          />
          <Button onClick={goToListPosts} type="submit">Cadastrar</Button>

        
        </Form>

        </ContainerLogin>
      </Body>
    );
  }
}

const mapDispatchToProps = dispatch => ({ 
  goToListPosts: () => dispatch(push(routes.listPosts)),
})

export default connect (
  null, 
  mapDispatchToProps
)(FormRegister);

