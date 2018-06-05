import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Welcome from "./components/Welcome";
import Lobby from "./components/Lobby";
import ActiveGame from "./components/ActiveGame";
import { connect } from "react-redux";
import LoggedIn from "./hoc/LoggedIn"
import { withRouter } from "react-router-dom"



class App extends Component {

  render() {
    const NewLobby = LoggedIn(Lobby)
    const NewActiveGame = LoggedIn(ActiveGame)
    return(
    <div>
      <Switch>
        <Route path="/games/:id" render={props => <NewActiveGame currentUser={this.props.currentUser} />}/>
        <Route path="/login" render={props => <Welcome routerProps={props} />}/>
        <Route exact path="/" render={props => <NewLobby currentUser={this.props.currentUser} {...props}/>}/>
      </Switch>
    </div>)
  }
}

export default withRouter(connect(({ currentUser }) => ({ ...currentUser }) )(App));
