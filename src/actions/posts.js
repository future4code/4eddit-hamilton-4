import axios from 'axios';
import { routes } from '../containers/Router'


//Funções síncronas
export const setAllPosts = (post) => {
  return {
    type: "SET_ALL_POSTS",
    payload: {
      post
    }
  };
};

export const setPostDetails = (comments) => {
  return {
    type: "SET_POST_DETAILS",
    payload: {
      comments
    }
  }
}

export const getPostId = (id) => {
  return {
    type: "GET_POST_ID",
    payload: {
      id
    }
  }
}

//Funções assíncronas

export const getPosts = () => async (dispatch, getState) => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.get(
      'https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts', {
      headers: {
        auth: token
      }
    }
    )
    dispatch(setAllPosts(response.data.posts))
  } catch (error) {
    console.error(error)
  }
}

export const createPost = (body) => async (dispatch, getState) => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.post(
      'https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts', body, {
      headers: {
        auth: token
      }
    }
    )
    alert("Post criado com sucesso!")
    dispatch(getPosts())
  } catch (error) {
    console.error()
  }
}

export const votePost = (direction, id) => async (dispatch, getState) => {
  const token = localStorage.getItem("token")
  const body = {
    direction
  }
  try {
    const response = await axios.put(
      `https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts/${id}/vote`, body, {
      headers: {
        auth: token
      }
    }
    )
    console.log(direction)
    dispatch(getPosts())
  } catch (error) {
    console.error()
  }
}

export const getPostDetails = (postId) => async (dispatch, getState) => {
  const token = localStorage.getItem("token")
   try {
     const response = await axios.get(
       `https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts/${postId}`, {
         headers: {
           auth: token
         }
       } 
     )
      console.log(response.data.post)
     dispatch(setPostDetails(response.data.post))
   } catch (error){
     console.error()
   }
}

