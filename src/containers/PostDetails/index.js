import React, { Component } from "react";
import styled, { keyframes } from 'styled-components'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push, replace } from "connected-react-router";
import { routes } from '../Router'
import { getPostDetails, createComment, voteComment } from '../../actions/posts'
//react icons início
import LinearProgress from '@material-ui/core/LinearProgress';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { FaRegCommentDots, FaShare } from 'react-icons/fa';
import { BsBookmarkFill, BsThreeDots } from 'react-icons/bs';

import { GoSearch } from 'react-icons/go'
import Imagem from '../../imgs/logoHeader.png'
import { PostFooter, PostLikeIcons, Icons, IconButton } from '../../components/Icons'

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
  min-height: 100vh;
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
  min-width: 500px;
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
  width: 400px;
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
const CommentHeader = styled.div`
  border-bottom: 2px solid #ed7f61;
  padding: 0px 10px 0px 10px;
`
//////////////////////post header components

//////////////////////post body components
const PostContent = styled.div`
  height: fit-content;
  width: 60%;
  padding:15px;
  margin: auto;
  text-align: center;
`
const CommentContent = styled.div`
  height: fit-content;
  width: 90%;
  padding:20px;
  margin: auto;
  text-align: center;
  word-wrap: break-word;
`
//////////////////////post body components
const H5 = styled.h5`
color: #636e72;
`
const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #ed7f61;
  padding: 6px 10px 3px 10px;
`

//////////////////////post footer components

//////////////////////////////post card components

////////////////////////////////Header
////////////////////////////Search Box
const FatherDiv = styled.div`
  display: flex;
  align-items: center;
`
const SearchIconDiv = styled.div`
  margin-top: 25px;
`
////////////////////////////Buttons
const HeaderButtons = styled.div `
  display: flex;
`
const ButtonHeadder = styled.div `
  margin: 0px 5px 0px 5px;
`

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
    event.preventDefault()
    this.props.createComment(this.state.comment, this.props.postId)
    this.setState({
      comment: ""
    })
  }

  handleCommentChange = (event) => {
    this.setState({
      comment: event.target.value
    })
  }

  handleCommentVote = (commentId, direction, userVoteDirection) => {
    if (direction === userVoteDirection) {
      this.props.voteComment(this.props.postId, commentId, 0)
    } else {
      this.props.voteComment(this.props.postId, commentId, direction)
    }
  }


  render() {
    const isLogged = localStorage.getItem("token") !== null
    const { postComment, posts, goToListPosts, postId } = this.props
    const currentPost = posts.find((post) => post.id === postId)
    console.log(currentPost)
    if (currentPost === undefined) {
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
        
         <HeaderButtons>
           <ButtonHeadder>
           <Button onClick={goToListPosts} variant="contained" color="primary">Voltar</Button></ButtonHeadder>
          {isLogged && <ButtonHeadder><Button onClick={this.handleLogout} variant="contained" color="primary">Logout</Button></ButtonHeadder>}
          </HeaderButtons> 

        </HeaderComp>

        <PostCard>
          <PostHeader>
            <p>Posted by:{currentPost.username}</p>
          </PostHeader>
          <PostContent>
            <b>{currentPost.title}</b>
            <p>{currentPost.text}</p>
          </PostContent>
          <PostFooter>{/* Post Footer */}            
            <PostLikeIcons>{/* Icons like e dislike */}
              <IconButton >
                <Icons>
                  <MdThumbUp />
                </Icons>
              </IconButton>
              <b>{currentPost.votesCount}</b>
              <IconButton >
                <Icons>
                  <MdThumbDown/>
                </Icons>
              </IconButton>
            </PostLikeIcons>

            {/* Seção comentário */}
            <IconButton>
              <Icons>
                <FaRegCommentDots />
              </Icons>
            </IconButton>
            <b>{currentPost.commentsCount}</b>

            {/* Icon compartilhar */}
            <IconButton>
              <Icons>
                <FaShare />
              </Icons>
            </IconButton>

            {/* Icon salvar */}
            <IconButton>
              <Icons>
                <BsBookmarkFill />
              </Icons>
            </IconButton>

            {/* Icon mais opções */}
            <IconButton>
              <Icons>
                <BsThreeDots />
              </Icons>
            </IconButton>

          </PostFooter>
          
          <TextField
            required
            variant="outlined"
            type="text"
            label="Escreva aqui seu comentário"
            style={{ width: 300 }}
            value={this.state.comment}
            onChange={this.handleCommentChange}
          />
          <br />
          <Button onClick={this.handleCreateComment} variant="contained" color="primary" type="submit">Comentar</Button>
          <br />
        </PostCard>

        {this.props.posts.length === 0 && <LinearProgress color="secondary" />}
        {/* Detalhe do post */}
        {postComment.map((comment) => {
          return (
            <CommentCard>
              <CommentHeader>
                <H5>Commented by: <u>{comment.username} 3 days ago</u></H5>
              </CommentHeader>

              <CommentContent>
                <p>{comment.tittle}</p>
                <p>{comment.text}</p>
              </CommentContent>

              <CommentFooter>
                {/* Icons like e dislike */}
                <PostLikeIcons>
                  <IconButton onClick={() => this.handleCommentVote(comment.id, 1, comment.userVoteDirection)}>
                    <Icons>
                      <MdThumbUp color={comment.userVoteDirection === 1 ? "red" : "#878a8c"} />
                    </Icons>
                  </IconButton>
                  <b>{comment.votesCount}</b>
                  <IconButton onClick={() => this.handleCommentVote(comment.id, -1, comment.userVoteDirection)} >
                    <Icons>
                      <MdThumbDown color={comment.userVoteDirection === -1 ? "blue" : "#878a8c"} />
                    </Icons>
                  </IconButton>
                </PostLikeIcons>
              </CommentFooter>

            </CommentCard>)
        })
        }

      </Body>
    );
  }
}

const mapStateToProps = (state) => ({
  postId: state.posts.postId,
  postComment: state.posts.postComment,
  posts: state.posts.posts,
})

const mapDispatchToProps = dispatch => ({
  goToLoginScreen: () => dispatch(replace(routes.root)),
  goToListPosts: () => dispatch(push(routes.listPosts)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
  backToListPosts: () => dispatch(replace(routes.listPosts)),
  createComment: (text, postId) => dispatch(createComment(text, postId)),
  voteComment: (postId, commentId, direction) => dispatch(voteComment(postId, commentId, direction))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);

