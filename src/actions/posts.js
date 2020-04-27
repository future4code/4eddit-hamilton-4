import axios from 'axios';
import {routes} from '../containers/Router'

//Funções síncronas
export const setPosts = postsList => {
    return {
      type: "SET_POSTS",
      payload: {
        postsList: postsList
      }
    };
  };

  //