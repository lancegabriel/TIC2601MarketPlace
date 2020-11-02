import { RESET_STORE } from '../actions/types'

const initialState = {
    loading: false,
    data: []
}

export default function (state = initialState, action) {

    switch (action.type) {
        case RESET_STORE:{
            delete action.payload.logins;
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        }
        default:
            return state        
    }
}