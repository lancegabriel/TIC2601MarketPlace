import axios from 'axios'
import { URL, GET_PRODUCT_COMMENTS, GET_PRODUCT_COMMENTS_ERROR } from './types';

export const getProductComments = (tokenId, productId) => async dispatch => {

    try {
        const res = await axios.get(`${URL}/comment/${productId}`, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: GET_PRODUCT_COMMENTS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_COMMENTS_ERROR,
            payload: err
        })
    }
}