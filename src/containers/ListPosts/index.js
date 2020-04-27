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
const ContainerPost = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 300px;
  width: 40vw;
  border: 1px solid black;
  height: fit-content;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 30px;
`
const PostContent = styled.div `
  height: 60px;
  width: 100%;
  border: 2px solid red;
`




class ListPosts extends Component {
  render() {
    const { goToListPosts } = this.props
    return (
      <Body>
        <ContainerPost>
          <TextField
          name="username"
          type="text"
          label="Conte nos o que está pensando..."
          // onChange={this.handleInputChange}
          // value={this.state.form.name || "" 
          />
          <Button /* aqui vai função pra enviar o post pra api */ type="submit">Postar!</Button>
        </ContainerPost>   


        <ContainerPost>
          <h3>Nome do Usuário</h3>
          <PostContent>
            conteúdo do post
          </PostContent>
        </ContainerPost>
      </Body>
    );
  }
}

const mapDispatchToProps = dispatch => ({ 
  //goToListPosts: () => dispatch(push(routes.listPosts)),
})

export default connect (
  null, 
  mapDispatchToProps
)(ListPosts);

