import React, { Component } from "react";
import styled from 'styled-components'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'
import Imagem from '../../imgs/logoWide.png'
import { loginUser } from '../../actions/user'


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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
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
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

handleLogin = (event) => {
  event.preventDefault()
  this.props.loginUser(this.state.email, this.state.password)
}

handleInputChange = (event) => {
  const {name, value} = event.target;
  this.setState ({
   [name] : value
  })
}

handleFieldChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

  render() {
    const { email, password } = this.state
    const { goToFormRegister } = this.props
    return (
      <Body>
        <ImgLogo src={Imagem}/>

        <ContainerLogin>
        <Form onSubmit={this.handleLogin}>
          <TextField
          width= "50%"
          name="email"
          required
          type="email"
          label="Email"
          onChange={this.handleFieldChange}
          value={email} 
          />
          <TextField
          width= "50%"
          name="password"
          required
          type="password"
          label="Senha"            
          onChange={this.handleFieldChange}
          value={password} 
          />
          <br/>
        
          <br/>
          <Button 
          variant="contained"
          color="secondary"
          type="submit"
          >Entrar</Button>
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
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  
})

export default connect (
  null, 
  mapDispatchToProps
)(LoginPage);

