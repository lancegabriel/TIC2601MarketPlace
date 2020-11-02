import { GET_USER_COMMENTS, GET_USER_COMMENTS_ERROR } from '../actions/types'

const initialState ={
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case GET_USER_COMMENTS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_USER_COMMENTS_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}