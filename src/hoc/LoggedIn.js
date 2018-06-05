import React from "react";
import { Redirect } from "react-router-dom"

const LoggedIn = (Component) => {
  return (props) => {
    return ((props.currentUser) ? <Component {...props}/> : <Redirect to="/login" />)
  }
}

export default LoggedIn
