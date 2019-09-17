import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types'
import axios from "axios";

// Sign in user action
export const loginUser = (loginData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/login', loginData)
        .then(result => {
            console.log(result.data)
            setAuthorizationHeader(result.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS })
            console.log(history)
            history.push('/')
        })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
             })
        })

}

// Retrives user data
export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then(result => {
            dispatch({
                type: SET_USER,
                payload: result.data
            })
        })
        .catch(err => {
            dispatch({ 
                type: SET_ERRORS,
                payload: err.response.data
             })
        })
}


// Sign us new user action
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/signup', newUserData)
      .then((res) => {
        setAuthorizationHeader(res.data.userToken);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  // Logout User
  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
  };


  // Store data to local storage
  const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };