import React from "react";
import GamesContainer from "./GamesContainer"
import NewGameForm from "./NewGameForm"
import { connect } from "react-redux"

class Lobby extends React.Component {

  render() {
    return (
      <div id="lobby">
        <div id="lobby-welcome-message">
        <h1>Welcome!</h1>
          <p>Select or create a game session to begin.</p>
        </div>
        <NewGameForm/>
        <GamesContainer />
      </div>
    )
  }
}

const connectedLobby = connect(state => ({ currentUser: state.currentUser.currentUser }) )(Lobby)

export default connectedLobby
