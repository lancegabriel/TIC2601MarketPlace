import { POST_BOOKMARKS, POST_BOOKMARKS_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case POST_BOOKMARKS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case POST_BOOKMARKS_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        default:
            return state;
    }
}