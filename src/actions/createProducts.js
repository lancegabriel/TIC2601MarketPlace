import axios from 'axios'
import { URL, POST_CREATE_PRODUCT, POST_CREATE_PRODUCT_ERROR } from './types';

export const setCreateProducts = (tokenId, body) => async dispatch => {

    try {
        const res = await axios.post(`${URL}/product`, body, {
            headers: {
                Authorization: tokenId
            }
        });
        dispatch({
            type: POST_CREATE_PRODUCT,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: POST_CREATE_PRODUCT_ERROR,
            payload: err
        })
    }
}
