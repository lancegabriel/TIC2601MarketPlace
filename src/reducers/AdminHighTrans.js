import { GET_CATEGORY_HIGH_TRANS, GET_CATEGORY_HIGH_TRANS_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_CATEGORY_HIGH_TRANS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_CATEGORY_HIGH_TRANS_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}
