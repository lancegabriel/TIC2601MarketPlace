import { ACCEPTED_OFFER_BUYER, ACCEPTED_OFFER_BUYER_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case ACCEPTED_OFFER_BUYER:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case ACCEPTED_OFFER_BUYER_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}
