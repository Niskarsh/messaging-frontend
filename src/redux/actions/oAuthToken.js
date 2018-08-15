import { SAVE_OAUTH_TOKEN } from './actionTypes'

export const save_token = token => {
    return {
        idToken: token,
        type: INITIATE_SAVE_OAUTH_TOKEN
    }
}