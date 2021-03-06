import { GET_CATEGORIES, GET_CATEGORIES_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_CATEGORIES:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}