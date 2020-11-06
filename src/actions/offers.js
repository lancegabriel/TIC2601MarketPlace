import axios from 'axios'
import { URL, POST_OFFERS, POST_OFFERS_ERROR, ACCEPT_OFFER, ACCEPT_OFFER_ERROR, RESCIND_OFFER, RESCIND_OFFER_ERROR } from './types';

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

export const acceptUserOffer = (tokenId, body) => async dispatch => {

    try {
        const res = await axios.post(`${URL}/acceptOffer`, body, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: ACCEPT_OFFER,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: ACCEPT_OFFER_ERROR,
            payload: err
        })
    }
}

export const rescindOffer = (tokenId, body) => async dispatch => {

    try {
        const res = await axios.post(`${URL}/rescindOffer`, body, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: RESCIND_OFFER,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: RESCIND_OFFER_ERROR,
            payload: err
        })
    }
}
