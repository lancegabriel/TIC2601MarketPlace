import axios from 'axios'
import { URL, GET_NUM_OF_PROD_SOLD, GET_NUM_OF_PROD_SOLD_ERROR,GET_CATEGORY_HIGH_TRANS, GET_CATEGORY_HIGH_TRANS_ERROR, GET_OFFER_RANGE_PROD,  GET_OFFER_RANGE_PROD_ERROR } from './types';

export const getOfferRange = () => async dispatch => {

    try {
        const res = await axios.get(`${URL}/admin/getRangeOfProds`);
        dispatch({
            type: GET_OFFER_RANGE_PROD,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_OFFER_RANGE_PROD_ERROR,
            payload: err
        })
    }
}
