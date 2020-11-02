import { GET_USER_PRODUCTS, GET_USER_PRODUCTS_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_USER_PRODUCTS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_USER_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                data: null
            }
        default:
            return state;
    }
}