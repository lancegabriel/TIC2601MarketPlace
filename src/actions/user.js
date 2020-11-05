import axios from 'axios'
import { URL, GET_USERNAME, GET_USERNAME_ERROR } from './types';

export const getUsername = (tokenId, userId) => async dispatch => {
    try {
        const res = await axios.post(`${URL}/user/${userId}), {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: GET_USERNAME,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_USERNAME_ERROR,
            payload: err
        })
    }
}
