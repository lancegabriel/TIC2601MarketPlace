import { GET_NUM_OF_PROD_SOLD, GET_NUM_OF_PROD_SOLD_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_NUM_OF_PROD_SOLD:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_NUM_OF_PROD_SOLD_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}
