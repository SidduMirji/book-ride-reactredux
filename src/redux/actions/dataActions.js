import { GET_USER_RIDES, CLEAR_ERRORS, SET_ERRORS, LOADING_UI, TOGGLE_ADD_RIDE } from '../types'
import axios from "axios";

// Loads the user Booked rides
export const loadUserRides = () => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.get('/rides')
        .then(result => {
            console.log(result.data)
            dispatch({
                type: GET_USER_RIDES,
                payload: result.data
            })
            dispatch({ type: CLEAR_ERRORS })

        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })

}


// Stores the user new rides
export const storeUserRide = (newRide) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/rides' , newRide)
        .then(result => {
            console.log(result.data)
            dispatch({ type: TOGGLE_ADD_RIDE, payload : false });
            dispatch(loadUserRides());
            dispatch({ type: CLEAR_ERRORS })

        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })

}