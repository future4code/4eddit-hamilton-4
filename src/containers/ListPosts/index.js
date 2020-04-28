import React, { Component } from "react";
import styled from 'styled-components'
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

import Imagem from '../../imgs/logoHeader.png'
import { getPosts, createPost, votePost } from '../../actions/posts'


const Body = styled.div`
  width: 100%;
  height: 100%;
  background-color: #DAE0E6;
  display: flex;
  flex-direction: column;
  align-items: center;
`
//////////////////////////////post card components
const PostCard = styled.div`
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
const PostHeader = styled.div`
  border-bottom: 2px solid #878a8c;
  padding: 0px 10px 0px 10px;
  margin-bottom: 20px;
`
const PostTittle = styled.div`
  border-bottom: 2px solid #878a8c;
  padding: 0px 10px 0px 10px;
  margin-bottom: 20px;
`
//////////////////////post header components

//////////////////////post body components
const PostContent = styled.div`
  height: fit-content;
  width: 100%;
  border: 2px solid red;
  padding:20px;
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
  :active {
    color: red;
  }
  :target {
    color: red;
  }
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

////////////////////////////Search Box
const FatherDiv = styled.div`
  display: flex;
  align-items: center;
`
const SearchIconDiv = styled.div`
  margin-top: 25px;
`

////////////////////////////Search Box



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
    this.setState ({ 
      postValue: {...this.state.postValue, [name]: value  }
    })
  }
  handleCreatePost = (event) => {
    event.preventDefault()
    this.props.createPost(this.state.postValue)
    this.setState ({
      postValue: {text: "", title: ''}    
    })
    console.log(this.state.postValue)
  }

  handleVote = (direction, id, userVoteDirection) => {
    if (direction === userVoteDirection){
      this.props.votePost(0, id)
    }else {
      this.props.votePost(direction, id)
    }
  }



  render() {
    const isLogged = localStorage.getItem("token") !== null
    const { goToPostDetails } = this.props
    console.log(this.props.posts)
    return (
      <Body>
        <HeaderComp>
          <ImgLogo src={Imagem} />

          <FatherDiv><TextField
            style = {{width: 500}} 
            label="Search"
            
            />
            <SearchIconDiv>
              <h2><GoSearch /></h2>
            </SearchIconDiv>
          </FatherDiv>

          {isLogged && <Button onClick={this.handleLogout} variant="contained" color="primary">Logout</Button>}
        </HeaderComp>

      
        <PostCard>
          <TextField
            name="title"
            type="text"
            required
            label="Dê um título para seu post"
            onChange={this.handleInputChange}
            value={this.state.postValue.title} 
          />
          <TextField
            name="text"
            type="text"
            required
            label="Conte-nos no que está pensando..."
            onChange={this.handleInputChange}
            value={this.state.postValue.text} 
          />
          <Button onClick={this.handleCreatePost} >Postar!</Button>
        </PostCard>


        {this.props.posts &&
          this.props.posts.map((post) => {
            return (
              <PostCard>
                <PostHeader>
                  <p>Usuário: {post.username}</p>
                </PostHeader>

                <PostContent>
                  <b>{post.title}</b>
                  <p>{post.text}</p>
                </PostContent>

                <PostFooter>

                  <PostLikeIcons>
                    <IconButton onClick={()=> this.handleVote(1, post.id, post.userVoteDirection)} >
                      <Icons>
                        <MdThumbUp color={post.userVoteDirection === 1 ? "red" : "#878a8c"}/>
                      </Icons>
                    </IconButton>
                    {post.votesCount}
                    <IconButton onClick={()=> this.handleVote(-1, post.id, post.userVoteDirection)} >
                      <Icons>
                        <MdThumbDown color={post.userVoteDirection === -1 ? "blue" : "#878a8c"}/>
                      </Icons>
                    </IconButton>
                  </PostLikeIcons>

                  <IconButton onClick={goToPostDetails}>
                    <Icons>
                      <FaRegCommentDots />
                    </Icons>
                  </IconButton>
                  <IconButton>
                    <Icons>
                      <FaShare />
                    </Icons>
                  </IconButton>
                  <IconButton>
                    <Icons>
                      <BsBookmarkFill />
                    </Icons>
                  </IconButton>
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
  votePost: (direction, id ) => dispatch(votePost(direction, id))

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts);

