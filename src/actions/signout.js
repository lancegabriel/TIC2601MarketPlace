import { RESET_STORE } from './types';

export const signout = () => async dispatch => {

    dispatch({
        type: RESET_STORE,
        payload: {}
    })
}