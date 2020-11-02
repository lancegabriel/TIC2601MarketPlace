import axios from 'axios'
import { URL, POST_SIGNUP, POST_SIGNUP_ERROR } from './types';

export const setSignup = (body) => async dispatch => {

    try {
        const res = await axios.post(`${URL}/signup`, body);
        dispatch({
            type: POST_SIGNUP,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: POST_SIGNUP_ERROR,
            payload: err
        })
    }
}