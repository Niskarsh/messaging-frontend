import { COMPLETE_LOGOUT } from '../actions/actionTypes'
const initialState ={}
export const logout = (state=initialState, action) => {
    switch (action.type) {
        case COMPLETE_LOGOUT : 
        return {
            ...state,
            idToken : ""
        }
    }

}