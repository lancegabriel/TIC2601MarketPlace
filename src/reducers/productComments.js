import { GET_PRODUCT_COMMENTS, GET_PRODUCT_COMMENTS_ERROR } from '../actions/types'

const initialState ={
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_PRODUCT_COMMENTS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_PRODUCT_COMMENTS_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}