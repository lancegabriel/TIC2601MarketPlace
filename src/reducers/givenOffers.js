import { GET_GIVEN_OFFERS, GET_GIVEN_OFFERS_ERROR } from '../actions/types'

const initialState ={
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_GIVEN_OFFERS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_GIVEN_OFFERS_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}
