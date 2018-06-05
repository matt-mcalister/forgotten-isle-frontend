import React from "react";
import { connect } from "react-redux"
import Inventory from "./Inventory"
import Treasure from "./Treasure"

const TeamGameInfo = (props) => {
  return (
    <div className="team-game-info">
      <div className="team-inventory-container">
        {props.teamActiveGames.map(ag => <Inventory key={ag.id} currentUserActiveGame={props.currentUserActiveGame} {...ag}/>)}
      </div>
      <div className="treasures-obtained">
        <h3>Treasures Obtained:</h3>
        <div className="treasures-obtained-container">
          {props.treasures_obtained && props.treasures_obtained.map(treasure => <Treasure key={treasure} card={treasure}/>)}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const teamActiveGames = Object.keys(state.activeGame.active_games).filter(id => parseInt(id, 10) !== state.currentUser.activeGameId).map(id => state.activeGame.active_games[id])
  return {
    currentUserActiveGame: state.activeGame.active_games[state.currentUser.activeGameId],
    teamActiveGames: teamActiveGames,
    treasures_obtained: state.activeGame.game.treasures_obtained
  }
}
export default connect(mapStateToProps)(TeamGameInfo)
