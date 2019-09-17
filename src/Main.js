import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';

import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';


// Pages
import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/signup'

// Components
import NavBar from './components/NavBar';
import AuthRoute from './util/AuthRoute'
import axios from "axios";


// Check for authentication 
const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}
/**
 * Main componet of the application provides the react routing utilities
 */
class Main extends Component {

    // CSS design custom them for survey-app
    theme = createMuiTheme({
        palette: {
            secondary: {
                main: '#DF3868'
            },
            primary: {
                main: '#1C1E56'
            }
        }
    },
    )

    render() {
        return (
            <MuiThemeProvider theme={this.theme}>
                <Router>
                    <NavBar  {...this.props} />
                    <div className="container">
                        <Switch>
                            {this.props.user.authenticated === true ?
                                <Route exact path="/" render={() => (
                                    <div>
                                        <Home {...this.props} />
                                    </div>
                                )} /> :
                                <AuthRoute exact path="/" component={Login}   {...this.props} />
                            }
                            <AuthRoute exact path="/login" component={Login}   {...this.props} />
                            <AuthRoute exact path="/signup" component={SignUp} {...this.props} />
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default Main;