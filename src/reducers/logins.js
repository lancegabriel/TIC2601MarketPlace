import { POST_LOGIN, POST_LOGIN_ERROR,RESET_STORE } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case POST_LOGIN:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case POST_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        case RESET_STORE:{
                delete action.payload.logins;
                return {
                    ...state,
                    loading: false,
                    data: action.payload
                }
            }
        default:
            return state;
    }
}