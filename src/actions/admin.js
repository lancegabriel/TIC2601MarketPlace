import axios from 'axios'
import { URL, GET_OFFER_RANGE_PROD,  GET_OFFER_RANGE_PROD_ERROR,
  GET_NUM_OF_PROD_SOLD, GET_NUM_OF_PROD_SOLD_ERROR,
  GET_CATEGORY_HIGH_TRANS, GET_CATEGORY_HIGH_TRANS_ERROR} from './types';

export const getOfferRange = () => async dispatch => {

    try {
        const res = await axios.get(`${URL}/getRangeOfProds`);
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

export const getHighestTrans = () => async dispatch => {

    try {
        const res = await axios.get(`${URL}/getHighestTrans`);
        dispatch({
            type: GET_CATEGORY_HIGH_TRANS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_CATEGORY_HIGH_TRANS_ERROR,
            payload: err
        })
    }
}


export const getNoSoldPerSeller = () => async dispatch => {

    try {
        const res = await axios.get(`${URL}/getNumOfProdSold`);
        dispatch({
            type: GET_NUM_OF_PROD_SOLD,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_NUM_OF_PROD_SOLD_ERROR,
            payload: err
        })
    }
}
