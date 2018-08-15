import { SAVE_OAUTH_TOKEN } from './actionTypes'

export const save_token = (idToken, reference) => {
    return {
        idToken,
        reference,
        type: INITIATE_SAVE_OAUTH_TOKEN
    }
}