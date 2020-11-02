import axios from 'axios'
import { URL, GET_CATEGORIES, GET_CATEGORIES_ERROR } from './types';

export const getCategories = () => async dispatch => {

    try {
        const res = await axios.get(`${URL}/category`);
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_ERROR,
            payload: err
        })
    }
}