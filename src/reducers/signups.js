import { POST_SIGNUP, POST_SIGNUP_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case POST_SIGNUP:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case POST_SIGNUP_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}