import { GET_OFFER_RANGE_PROD, GET_OFFER_RANGE_PROD_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_OFFER_RANGE_PROD:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_OFFER_RANGE_PROD_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}
