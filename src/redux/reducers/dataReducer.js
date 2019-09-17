import { GET_USER_RIDES } from '../types'


// Data Initial State.
const initialState = {
    rides: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_RIDES:
            return {
                ...state,
                rides: action.payload,
            }
        default:
            return state;
    }
}