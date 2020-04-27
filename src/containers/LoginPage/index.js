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


class LoginPage extends Component {
  render() {
    const { goToFormRegister } = this.props
    return (
      <Body>
        <ContainerLogin>
        <Form>
          <TextField
          width= "50%"
          name="email"
          required
          type="email"
          label="Username"
          // onChange={this.handleInputChange}
          // value={this.state.form.name || "" 
          />
          <TextField
          width= "50%"
          name="password"
          required
          type="password"
          label="Senha"            
          // onChange={this.handleInputChange}
          // value={this.state.form.name || "" 
          />
          <br/>
        
          <br/>
          <Button 
          variant="contained"
          color="secondary"
          type="submit">Entrar</Button>
          <br/>
          <Button 
          variant="contained"
          color="primary"
          onClick={goToFormRegister}>Cadastrar</Button>
        </Form>
          
       

        </ContainerLogin>
      </Body>
    );
  }
}

const mapDispatchToProps = dispatch => ({ 
  goToFormRegister: () => dispatch(push(routes.register)),
})

export default connect (
  null, 
  mapDispatchToProps
)(LoginPage);

