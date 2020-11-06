import { POST_OFFERS, POST_OFFERS_ERROR,  ACCEPT_OFFER, ACCEPT_OFFER_ERROR, RESCIND_OFFER, RESCIND_OFFER_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    data: []
}

export default function(state = initialState, action){

    switch(action.type){
        case POST_OFFERS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case POST_OFFERS_ERROR:
            return {
                ...state,
                loading: false,
                data:null
            }
        case ACCEPT_OFFER:
                return {
                    ...state,
                    loading: false,
                    data: action.payload
                }
        case ACCEPT_OFFER_ERROR:
                return {
                    ...state,
                    loading: false,
                    data:null
                }
        case RESCIND_OFFER:
                  return {
                      ...state,
                        loading: false,
                        data: action.payload
                        }
        case RESCIND_OFFER_ERROR:
                        return {
            ...state,
                            loading: false,
                            data:null
                        }
        default:
            return state;
    }
}
