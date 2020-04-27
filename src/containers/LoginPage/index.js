import React, { Component } from "react";
import styled from 'styled-components'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'
import Imagem from '../../imgs/logoWide.png'


const Body = styled.div `
  width: 100vw;
  height: 100vh;
  background-color: #DAE0E6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`
const ContainerLogin = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 400px;
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
const ImgLogo = styled.img `
  width: 400px;
  border-radius: 5px;
  margin-bottom: 50px;
`


class LoginPage extends Component {
  render() {
    const { goToListPosts } = this.props
    const { goToFormRegister } = this.props
    return (
      <Body>
        <ImgLogo src={Imagem}/>

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
          type="submit"
          onClick={goToListPosts}>Entrar</Button>
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
  goToListPosts: () => dispatch(push(routes.listPosts))
})

export default connect (
  null, 
  mapDispatchToProps
)(LoginPage);

