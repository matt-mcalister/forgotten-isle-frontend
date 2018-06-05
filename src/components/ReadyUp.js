import React from "react";
import { connect } from "react-redux"
import ReadyUpButton from "./ReadyUpButton"
import { beginGame } from "../actions"
import { RestfulAdapter } from "../connections/adapter"

class ReadyUp extends React.Component {
  beginGameButton = () => {
    const beginGameFetch = () => RestfulAdapter.editFetchToChannel("games", this.props.game.id, {game: {in_session: true}})
    if (this.props.active_games.length > 0 && this.props.active_games.every(ag => ag.ready_to_start)){
      return <div className="begin-game-button" onClick={beginGameFetch}><h3>Begin Game</h3></div>
    }
  }


  render() {
    return (
      <div className="active-game-bottom ready-up">
        <div className="ready-up-container">
          {!!this.props.active_games.length && this.props.active_games.map(ag => <ReadyUpButton key={ag.id} active_game={ag} />)}
        </div>
        {this.beginGameButton()}
      </div>
    )
  }
}

const mapStateToProps = state => {

  return {
    active_games: Object.keys(state.activeGame.active_games).map(id => state.activeGame.active_games[id]),
    game: state.activeGame.game
  }
}

export default connect(mapStateToProps, { beginGame } )(ReadyUp)
