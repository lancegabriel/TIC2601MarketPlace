import { POST_CREATE_PRODUCT, POST_CREATE_PRODUCT_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case POST_CREATE_PRODUCT:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case POST_CREATE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}
