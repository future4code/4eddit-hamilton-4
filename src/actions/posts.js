import axios from 'axios';
import {routes} from '../containers/Router'

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
      const response = await axios.get (
    'https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts', {
        headers: {
          auth: token
        }
    }
  )
  dispatch(setAllPosts(response.data.posts))
 } catch(error) {
   console.error(error)
 }

}