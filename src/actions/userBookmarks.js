import axios from 'axios'
import { URL, GET_USER_BOOKMARKS, GET_USER_BOOKMARKS_ERROR } from './types';

export const getUserBookmarks = (tokenId, userId) => async dispatch => {

    try {
        const res = await axios.get(`${URL}/bookmark/${userId}`, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: GET_USER_BOOKMARKS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_USER_BOOKMARKS_ERROR,
            payload: err
        })
    }
}