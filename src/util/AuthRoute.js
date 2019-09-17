import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// Auth Route middleware for components
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
          return rest.user.authenticated === true ? <Redirect to="/" /> : <Component {...props} {...rest} />
      }
      }
    />
  );
export default AuthRoute
