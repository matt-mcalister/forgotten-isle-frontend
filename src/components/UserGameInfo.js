import React from "react";
import { connect } from "react-redux"
import CurrentTurnInterface from "./CurrentTurnInterface"
import Inventory from "./Inventory"
import { userMustDiscard, removeTemporaryMessages, userMustRelocate } from "../actions"

class UserGameInfo extends React.Component {
  componentDidUpdate(){
    if (!this.props.end_game){
      if (this.props.currentUserActiveGame["must_discard?"]) {
        this.props.userMustDiscard()
      } else if (this.props.giveTreasureAction || this.props.helpMessage){
        return null
      } else if (this.props.currentUserActiveGame["must_relocate?"]){
        this.props.userMustRelocate()
      } else {
        this.props.removeTemporaryMessages()
      }
    }
  }

  render(){
    return (
      <div className="active-game-bottom game-info">
        {((!this.props.halt_game && this.props.currentUserActiveGame["is_users_turn?"]) || this.props.currentUserActiveGame["must_relocate?"]) && <CurrentTurnInterface active_game={this.props.currentUserActiveGame}/>}
        <div className="user-inventory-container">
          <Inventory key={this.props.currentUserActiveGame.id} currentUserActiveGame={this.props.currentUserActiveGame} {...this.props.currentUserActiveGame}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    giveTreasureAction: state.activeGame.giveTreasureAction,
    currentUserActiveGame: state.activeGame.active_games[state.currentUser.activeGameId],
    halt_game: state.activeGame.game["halt_game?"],
    end_game: state.activeGame.game.end_gamem,
    helpMessage: state.activeGame.help_message
  }
}
export default connect(mapStateToProps, { userMustDiscard, removeTemporaryMessages, userMustRelocate })(UserGameInfo)
