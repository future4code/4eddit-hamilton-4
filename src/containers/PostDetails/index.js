import React, { Component } from "react";
import styled, { keyframes } from 'styled-components'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push, replace } from "connected-react-router";
import { routes } from '../Router'
import { getPostDetails, createComment } from '../../actions/posts'
//react icons início
import LinearProgress from '@material-ui/core/LinearProgress';

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
const CommentCard = styled.div`
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

    if (this.props.postId === undefined) {
      this.props.backToListPosts()
    } else {
      this.props.getPostDetails(this.props.postId, localStorage.getItem("token"))
    }
  }

  handleLogout = () => {
    localStorage.clear()
    this.props.goToLoginScreen()
  }

  handleCreateComment = (event) => {
    // const token = localStorage.getItem("token")
    // const { createComment }
     event.preventDefault()
     this.props.createComment(this.state.comment,  this.props.postInfo.id)
     this.setState({
       comment: ""
     })
  }

  handleCommentChange = (event) => {
    this.setState ({
      comment: event.target.value
    }) 
  }


  render() {
    const isLogged = localStorage.getItem("token") !== null
    const { postInfo, posts, goToListPosts, postId } = this.props
    const currentPost = posts.find ((post) => post.id === postId)
console.log(currentPost)
if (currentPost === undefined){
  return <div>carregando..</div>
}
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

        <CommentCard>
          <PostHeader>
            <p>{currentPost.username}</p>
          </PostHeader>
          <PostContent>
            <b>{currentPost.title}</b>
          <p>{currentPost.text}</p>

      </PostContent>

          <TextField
            name="username"
            required
            type="text"
            label="Escreva aqui seu comentário"
            style={{ width: 300 }}
            value={this.state.comment}
            onChange={this.handleCommentChange}
          />
          <Button onClick={this.handleCreateComment} variant="contained" color="primary" type="submit">Comentar</Button>

        </CommentCard>

        {/* <CreateComment>

        </CreateComment> */}

  


{this.props.posts.length === 0 && <LinearProgress color="secondary"/>}
        {/* Detalhe do post */}
        {postInfo.map((post) => {
            return (
            <PostCard>
              <PostHeader>
                <p>nome do usário: {post.username}</p>
              </PostHeader>

              <PostContent>
               <p>{post.tittle}</p> 
               <p>{post.text}</p> 
              </PostContent>

            
            </PostCard>)
          })
        }
        
      </Body>
    );
  }
}

const mapStateToProps = (state) => ({
  postId: state.posts.postId,
  postInfo: state.posts.postInfo,
  posts: state.posts.posts

})

const mapDispatchToProps = dispatch => ({
  goToLoginScreen: () => dispatch(replace(routes.root)),
  goToListPosts: () => dispatch(push(routes.listPosts)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
  backToListPosts: () => dispatch(replace(routes.listPosts)),
  createComment: (text, postId) => dispatch(createComment(text, postId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);

