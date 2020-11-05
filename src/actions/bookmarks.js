import axios from 'axios'
import { URL, POST_BOOKMARKS, POST_BOOKMARKS_ERROR } from './types';

export const postUserBookmarks = (tokenId, body) => async dispatch => {

    try {
        const res = await axios.post(`${URL}/bookmark`, body, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: POST_BOOKMARKS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: POST_BOOKMARKS_ERROR,
            payload: err
        })
    }
}