import axios from 'axios'
import { URL, GET_USER_OFFERS, GET_USER_OFFERS_ERROR, GET_GIVEN_OFFERS, GET_GIVEN_OFFERS_ERROR, ACCEPTED_OFFER_BUYER, ACCEPTED_OFFER_BUYER_ERROR, ACCEPTED_OFFER_SELLER, ACCEPTED_OFFER_SELLER_ERROR } from './types';

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

export const getGivenOffers = (tokenId, sellerId) => async dispatch => {

    try {
        const res = await axios.get(`${URL}/offersGiven/${sellerId}`, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: GET_GIVEN_OFFERS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_GIVEN_OFFERS_ERROR,
            payload: err
        })
    }
}

export const getAcceptedOffersBuyer = (tokenId, sellerId) => async dispatch => {

    try {
        const res = await axios.get(`${URL}/offersAcceptedBuyer/${sellerId}`, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: ACCEPTED_OFFER_BUYER,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: ACCEPTED_OFFER_BUYER_ERROR,
            payload: err
        })
    }
}

export const getAcceptedOfferSeller = (tokenId, sellerId) => async dispatch => {

    try {
        const res = await axios.get(`${URL}/offersAcceptedSeller/${sellerId}`, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: ACCEPTED_OFFER_SELLER,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: ACCEPTED_OFFER_SELLER_ERROR,
            payload: err
        })
    }
}
