import { COMPLETE_SAVE_OAUTH_TOKEN } from '../actions/actionTypes'

const initialState = {}

export const oAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMPLETE_SAVE_OAUTH_TOKEN:
            return {
                ...state,
                idToken: idToken
            }
    }
    return state
}
