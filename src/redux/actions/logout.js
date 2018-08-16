import { INITIATE_LOGOUT } from './actionTypes'

export const logout = (reference) => {
    return {
        reference,
        type : INITIATE_LOGOUT
    }
}