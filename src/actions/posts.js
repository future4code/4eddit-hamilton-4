import axios from 'axios';
import { routes } from '../containers/Router'

const token = localStorage.getItem("token")

//Funções síncronas
export const setAllPosts = (post) => {
  return {
    type: "SET_ALL_POSTS",
    payload: {
      post
    }
  };
};

//Funções assíncronas

export const getPosts = () => async (dispatch, getState) => {
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

