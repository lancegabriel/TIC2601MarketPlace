import axios from 'axios'
import { URL, GET_USER_COMMENTS, GET_USER_COMMENTS_ERROR } from './types';

export const getUserComments = (tokenId, userId) => async dispatch => {

    try {
        const res = await axios.get(`${URL}/comments/${userId}`, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: GET_USER_COMMENTS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_USER_COMMENTS_ERROR,
            payload: err
        })
    }
}