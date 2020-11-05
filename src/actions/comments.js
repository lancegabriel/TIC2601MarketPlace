import axios from 'axios'
import { URL, POST_COMMENTS, POST_COMMENTS_ERROR } from './types';

export const postUserComments = (tokenId, body) => async dispatch => {

    try {
        const res = await axios.post(`${URL}/comment`, body, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: POST_COMMENTS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: POST_COMMENTS_ERROR,
            payload: err
        })
    }
}