import axios from 'axios'
import { URL, POST_LOGIN, POST_LOGIN_ERROR } from './types';

export const setLogin = (body) => async dispatch => {

    try {
        const res = await axios.post(`${URL}/login`, body);
        dispatch({
            type: POST_LOGIN,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_LOGIN_ERROR,
            payload: err
        })
    }
}