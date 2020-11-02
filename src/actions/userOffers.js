import axios from 'axios'
import { URL, GET_USER_OFFERS, GET_USER_OFFERS_ERROR } from './types';

export const getUserOffers = (tokenId, sellerId) => async dispatch => {

    try {
        const res = await axios.get(`${URL}/offer/${sellerId}`, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: GET_USER_OFFERS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_USER_OFFERS_ERROR,
            payload: err
        })
    }
}