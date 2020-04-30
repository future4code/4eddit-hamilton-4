import React, { Component } from "react";
import styled, {keyframes} from 'styled-components'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push, replace } from "connected-react-router";
import { routes } from '../Router'
//react icons início
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { FaRegCommentDots, FaShare } from 'react-icons/fa';
import { BsBookmarkFill, BsThreeDots } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go'
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import Imagem from '../../imgs/logoHeader.png'
import { getPosts, createPost, votePost, getPostDetails, getPostId } from '../../actions/posts'
import { withStyles } from '@material-ui/core/styles';
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

const ContentWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const StyledButton = withStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: '#ed7f61',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


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

const ProgressDiv = styled.div `
  display: flex;
  justify-content: center;
`

//////////////////////////////post card components
const PostCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  margin:auto;
  
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
  min-width: 500px;
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

//////////////////////post body components
const PostContent = styled.div`
  height: fit-content;
  width: 90%;
  padding:20px;
  margin: auto;
  text-align: center;
  word-wrap: break-word;
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

////////////////////////////Search Box
const FatherDiv = styled.div`
  display: flex;
  align-items: center;
`
const SearchIconDiv = styled.div`
  margin-top: 25px;
`

const H5 = styled.h5`
color: #636e72;
`

class ListPosts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postValue: {
        text: "",
        title: ""
      }
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token === null)
      this.props.goToLoginScreen()
    this.props.getPosts()
  }

  handleLogout = () => {
    localStorage.clear()
    this.props.goToLoginScreen()
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      postValue: { ...this.state.postValue, [name]: value }
    })
  }
  handleCreatePost = (event) => {
    event.preventDefault()
    this.props.createPost(this.state.postValue)
    this.setState({
      postValue: { text: "", title: '' }
    })
    // console.log(this.state.postValue)
  }

  handleVote = (direction, id, userVoteDirection) => {
    if (direction === userVoteDirection) {
      this.props.votePost(0, id)
    } else {
      this.props.votePost(direction, id)
    }
  }
  
  handlePostId = (id) => {
    console.log(id)
    this.props.goToPostDetails()
    this.props.getPostId(id)
  }


  render() {
    const isLogged = localStorage.getItem("token") !== null

    return (
      <Body>
        {/* Header do site */}
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

          {isLogged && <Button onClick={this.handleLogout} variant="contained" color="primary">Logout</Button>}
        </HeaderComp>
        <ContentWrapper>
          
        {/* Criação de um post */}
        <CreatePost>
          <TextField
            style={{ width: 300 }}
            name="title"
            type="text"
            required
            label="Dê um título para seu post"
            onChange={this.handleInputChange}
            value={this.state.postValue.title}
          />
          <TextField
            style={{ width: 300 }}
            name="text"
            type="text"
            required
            label="Conte-nos no que está pensando..."
            onChange={this.handleInputChange}
            value={this.state.postValue.text}
          />
          <br />
          <StyledButton variant="contained" color="secondary" onClick={this.handleCreatePost} >POSTAR</StyledButton>
        </CreatePost>

        <ProgressDiv>{this.props.posts.length === 0 && <CircularProgress color="secondary" />}</ProgressDiv>
        {/* Lista de post */}
        {this.props.posts &&
          this.props.posts.map((post) => {
            return (

              <PostCard>
                <PostHeader>
                  <H5>Posted by: <u>{post.username} 3 days ago</u></H5>
                </PostHeader>

                <PostContent>
                  <b>{post.title}</b>
                  <p>{post.text}</p>
                </PostContent>

                <PostFooter>

                  {/* Icons like e dislike */}
                  <PostLikeIcons>
                    <IconButton onClick={() => this.handleVote(1, post.id, post.userVoteDirection)} >
                      <Icons>
                        <MdThumbUp color={post.userVoteDirection === 1 ? "red" : "#878a8c"} />
                      </Icons>
                    </IconButton>
                   <b>{post.votesCount}</b> 
                    <IconButton onClick={() => this.handleVote(-1, post.id, post.userVoteDirection)} >
                      <Icons>
                        <MdThumbDown color={post.userVoteDirection === -1 ? "blue" : "#878a8c"} />
                      </Icons>
                    </IconButton>
                  </PostLikeIcons>

                  {/* Seção comentário */}
                  <IconButton onClick={() => this.handlePostId(post.id)}>
                    <Icons>
                      <FaRegCommentDots />
                    </Icons>
                  </IconButton>
                  <b>{post.commentsCount}</b>

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
              </PostCard>
            )
          })
        }
        </ContentWrapper>
      </Body>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts

})

const mapDispatchToProps = dispatch => ({
  goToPostDetails: () => dispatch(push(routes.postDetails)),
  goToLoginScreen: () => dispatch(replace(routes.root)),
  getPosts: () => dispatch(getPosts()),
  createPost: (body) => dispatch(createPost(body)),
  votePost: (direction, id) => dispatch(votePost(direction, id)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
  getPostId: (id) => dispatch(getPostId(id))

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts);

