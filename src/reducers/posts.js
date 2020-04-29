const initialState = {
    posts: [],
    postInfo: [],
    postId: ""
}

const posts = (state = initialState, action) => {
    switch (action.type) {
      case "SET_ALL_POSTS":{
        return {...state, posts: action.payload.post}
      }
      case "SET_POST_DETAILS": {
        return {...state, postInfo: action.payload.comments}
      }
      case "GET_POST_ID": {
        return {...state, postId: action.payload.id}
      }
      default:
        return state;
    }
  };




  export default posts
  