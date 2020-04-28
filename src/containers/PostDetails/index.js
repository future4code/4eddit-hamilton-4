import React, { Component } from "react";
import styled from 'styled-components'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push, replace } from "connected-react-router";
import { routes } from '../Router'
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { FaRegCommentDots, FaShare} from 'react-icons/fa';
import { BsBookmarkFill, BsThreeDots } from 'react-icons/bs';
import Imagem from '../../imgs/logoHeader.png'



///////////////////////////////Header
const HeaderComp = styled.div `
  width: 100%;
  height: 100px;
  background-color:  #ED7F61;
  display: flex;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 50px;
  justify-content: space-between;
`
const ImgLogo = styled.img `
  width: 120px;
`
///////////////////////////////Header

const Body = styled.div `
  width: 100%;
  height: 100%;
  background-color: #DAE0E6;
  display: flex;
  flex-direction: column;
  
  align-items: center;
`
//////////////////////////////post card and other components
const PostCard = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 500px;
  width: 40vw;
  border: 2px solid #878a8c;
  height: fit-content;
 /* padding: 20px; */
  box-sizing: border-box;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 5px;
`

//////////////////////post header components
const PostHeader = styled.div `
  border-bottom: 2px solid #878a8c;
  padding: 0px 10px 0px 10px;
  margin-bottom: 20px;
`
//////////////////////post header components

//////////////////////post body components
const PostContent = styled.div `
  height: fit-content;
  width: 100%;
  border: 2px solid red;
  padding:20px;
`
//////////////////////post body components

//////////////////////post footer components
const PostFooter = styled.div `
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #878a8c;
  padding: 6px 10px 3px 10px;
  margin-top: 20px;
`
//////Thumbs Icons Div
const PostLikeIcons = styled.div `
  display: flex;
  
`
const Icons = styled.h2 `
  margin: 0px 10px 0px 10px;
  color: #878a8c;
`
//////Icons Button
const IconButton = styled.button `
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: initial;
  height: fit-content;
  outline: none;
`
//////////////////////post footer components

//////////////////////////////post card components



class PostDetails extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token === null)
    this.props.goToLoginScreen()
  }
  handleLogout = () => {
    localStorage.clear()
    this.props.goToLoginScreen()
  }
  

  render() {
    const { goToListPosts } = this.props
    const isLogged = localStorage.getItem("token") !== null
    return (
      <Body>

      <HeaderComp>
          <ImgLogo src={Imagem}/>
          <TextField
          label="Search"
          />
         {isLogged && <Button onClick={this.handleLogout} variant="contained" color="primary">Logout</Button>}
      </HeaderComp>

    <PostCard>
      <PostHeader>
          <p>Nome do Usuário</p>
      </PostHeader>

      <PostContent>
            conteúdo do post
      </PostContent>

      <PostFooter>
        <PostLikeIcons>
          <IconButton>
              <Icons>
                <MdThumbUp/>
              </Icons>
          </IconButton>
          <IconButton>
              <Icons>
                <MdThumbDown/>
              </Icons>
          </IconButton>
        </PostLikeIcons>

          <IconButton>
            <Icons>
              <FaRegCommentDots/>
            </Icons>            
          </IconButton>
          <IconButton>
            <Icons>
              <FaShare/>
            </Icons>     
          </IconButton>
          <IconButton>
            <Icons>
              <BsBookmarkFill/>
            </Icons>
          </IconButton>
          <IconButton> 
            <Icons>
              <BsThreeDots/>
            </Icons>
          </IconButton>
      </PostFooter>
    </PostCard>

    <PostCard>
    
    <TextField
      name="username"
      type="text"
      label="Escreva aqui seu comentário"
      // onChange={this.handleInputChange}
      // value={this.state.form.name || "" 
      />
      <Button /* aqui vai função pra enviar o comentário pra api */ type="submit">Comentar</Button>
    </PostCard>   

    <PostCard>
      <PostHeader>
          <p>Nome do Usuário</p>
      </PostHeader>
      <PostContent>
            conteúdo do comentário
      </PostContent>

      <PostFooter>
        <PostLikeIcons>
          <IconButton>
              <Icons>
                <MdThumbUp/>
              </Icons>
          </IconButton>
          <IconButton>
              <Icons>
                <MdThumbDown/>
              </Icons>
          </IconButton>
        </PostLikeIcons>

      </PostFooter>
    </PostCard>

      </Body>
    );
  }
}

const mapDispatchToProps = dispatch => ({ 
  goToLoginScreen: () => dispatch(replace(routes.root))
  //goToListPosts: () => dispatch(push(routes.listPosts)),
})

export default connect (
  null, 
  mapDispatchToProps
)(PostDetails);

