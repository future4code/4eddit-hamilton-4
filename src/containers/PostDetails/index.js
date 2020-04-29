import React, { Component } from "react";
import styled, { keyframes } from 'styled-components'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push, replace } from "connected-react-router";
import { routes } from '../Router'
import { getPostDetails } from '../../actions/posts'
//react icons início
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { FaRegCommentDots, FaShare } from 'react-icons/fa';
import { BsBookmarkFill, BsThreeDots } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go'
import Imagem from '../../imgs/logoHeader.png'


const colors = keyframes` {
  0% {
      background-position: 0% 50%;
  }

  50%{
      background-position: 100% 50%;
  }

  100%{
      background-position: 0% 50%;
  }
}
`

///////////////////////////////Header
const HeaderComp = styled.div`
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
const ImgLogo = styled.img`
  width: 120px;
`
///////////////////////////////Header

const Body = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg ,#c0c0aa ,#1cefff ) ;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: 150% 150%;
  animation: ${colors} 13s ease infinite;
 
`
//////////////////////////////post card and other components
const PostCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 400px;
  width: 30vw;
  height: fit-content;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  box-sizing: border-box;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 5px;
`
const CreatePost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 400px;
  width: 30vw;
  height: fit-content;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  box-sizing: border-box;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 5px;
  padding: 30px;
`

//////////////////////post header components
const PostHeader = styled.div`
  border-bottom: 2px solid #ed7f61;
  padding: 0px 10px 0px 10px;
  margin-bottom: 20px;
`
//////////////////////post header components

//////////////////////post body components
const PostContent = styled.div`
  height: fit-content;
  width: 60%;
  padding:20px;
  margin: auto;
  text-align: center;
`
//////////////////////post body components

//////////////////////post footer components
const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #878a8c;
  padding: 6px 10px 3px 10px;
  margin-top: 20px;
`
//////Thumbs Icons Div
const PostLikeIcons = styled.div`
  display: flex;
  
`
const Icons = styled.h2`
  margin: 0px 10px 0px 10px;
  color: #878a8c;
`
//////Icons Button
const IconButton = styled.button`
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

////////////////////////////Search Box
const FatherDiv = styled.div`
  display: flex;
  align-items: center;
`
const SearchIconDiv = styled.div`
  margin-top: 25px;
`

////////////////////////////Search Box


class PostDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ""
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token === null) {
      this.props.goToLoginScreen()
    }
    this.props.getPostDetails(this.props.postId, localStorage.getItem("token"))

  }

  handleLogout = () => {
    localStorage.clear()
    this.props.goToLoginScreen()
  }




  render() {
    const { goToListPosts } = this.props
    const isLogged = localStorage.getItem("token") !== null
    const { posts } = this.props
    return (
      <Body>
        {/* Header da página */}
        <HeaderComp>
          <ImgLogo src={Imagem} />
          <FatherDiv><TextField
            style={{ width: 500 }}
            label="Search"
          />
            <SearchIconDiv>
              <h2><GoSearch /></h2>
            </SearchIconDiv>
          </FatherDiv>
          <Button onClick={goToListPosts} variant="contained" color="secondary">Voltar</Button>
          {isLogged && <Button onClick={this.handleLogout} variant="contained" color="primary">Logout</Button>}
        </HeaderComp>

        {/* Detalhe do post */}
        {this.props.postInfo &&
          this.props.postInfo.map((post) => {
            return (
            <PostCard>
              <PostHeader>
                <p>nome do usário: {post.username}</p>
              </PostHeader>

              <PostContent>
               <p>Post tittle</p> 
               <p>Post text</p> 
              </PostContent>

              {/* <PostFooter>
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
              </PostFooter> */}
            </PostCard>)
          })
        }

        <CreatePost>
          <TextField
            name="username"
            type="text"
            label="Escreva aqui seu comentário"
          // onChange={this.handleInputChange}
          // value={this.state.form.name || "" 
          />
          <Button /* aqui vai função pra enviar o comentário pra api */ type="submit">Comentar</Button>
        </CreatePost>

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
                  <MdThumbUp />
                </Icons>
              </IconButton>
              <IconButton>
                <Icons>
                  <MdThumbDown />
                </Icons>
              </IconButton>
            </PostLikeIcons>

          </PostFooter>
        </PostCard>

      </Body>
    );
  }
}

const mapStateToProps = (state) => ({
  postId: state.posts.postId,
  postInfo: state.posts.postInfo,

})

const mapDispatchToProps = dispatch => ({
  goToLoginScreen: () => dispatch(replace(routes.root)),
  goToListPosts: () => dispatch(push(routes.listPosts)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);

