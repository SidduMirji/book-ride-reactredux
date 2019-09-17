import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, TOGGLE_ADD_RIDE } from '../types'


// UI Initial State.
const initialState = {
    loading: false,
    error: null,
    showAddDialog: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case TOGGLE_ADD_RIDE:
            return {
                ...state,
                loading: false,
                showAddDialog: action.payload
            }



        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }

        case LOADING_UI:
            return {
                ...state,
                loading: true,
            }

        default:
            return state;
    }
}