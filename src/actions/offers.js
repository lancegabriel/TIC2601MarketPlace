import axios from 'axios'
import { URL, POST_OFFERS, POST_OFFERS_ERROR } from './types';

export const postUserOffers = (tokenId, body) => async dispatch => {

    try {
        const res = await axios.post(`${URL}/offer`, body, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: POST_OFFERS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: POST_OFFERS_ERROR,
            payload: err
        })
    }
}