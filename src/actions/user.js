import axios from 'axios';
import { routes } from '../containers/Router'
import { push } from 'connected-react-router'


////////////assíncronas
export const createUser = (body) => async (dispatch) => {
    try {
        const response = await axios.post(
            'https://us-central1-future-apis.cloudfunctions.net/fourEddit/signup',
            body 
            );
        localStorage.setItem("token", response.data.token)
        dispatch(push(routes.listPosts))
    } catch (error) {
        alert("Verifique os campos. Não foi possível criar novo usuário.");
        console.error(error);
    }
}