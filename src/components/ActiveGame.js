import React from "react";
import { connect } from "react-redux";
import Tile from "./Tile"
import UserGameInfo from "./UserGameInfo"
import TeamGameInfo from "./TeamGameInfo"
import GameOver from "./GameOver"
import ReadyUp from "./ReadyUp"
import TeamChat from "./TeamChat"
import PlayerToken from "./PlayerToken"
import { ActionCable } from 'react-actioncable-provider';
import { addActiveGameUsers, removeActiveGameUsers, addMessage, beginGame, updateGame, handleShoredTile } from "../actions"



class ActiveGame extends React.Component {

  handleReceivedData = (data) => {
    if (data.active_game) {
      this.props.addActiveGameUsers(data.active_game)
    } else if (data.removed_active_game){
      this.props.removeActiveGameUsers(data.game, data.removed_active_game, data.active_games)
    } else if (data.message) {
      this.props.addMessage(data)
    } else if (data.game_in_session) {
      this.props.beginGame(data.game_in_session)
    } else if (data.new_turn) {
      this.props.updateGame(data.new_turn)
    }
  }

  render() {
    if (this.props.loading){
      return <div className="loader"></div>
    } else {
      return (
        <div className="active-game">
          {this.props.id && (<ActionCable
           channel={{ channel: 'ActiveGamesChannel', game_id: this.props.id }}
           onReceived={this.handleReceivedData}
           />)}
          {this.props.end_game && <GameOver result={this.props.end_game}/>}
          <div className="ocean" style={{"opacity":`${this.props.water_level/10}`, "zIndex":`${this.props.water_level*100}`}} />
          <div className="board">
            {this.props.tiles && this.props.tiles.map(tile => <Tile key={tile.tile.id} tile={tile.tile}/>)}
            {!!this.props.active_games && this.props.active_games.map(ag => <PlayerToken key={ag.id} {...ag}/> ) }
          </div>
          <TeamChat />
          {this.props.in_session ? <UserGameInfo /> : <ReadyUp /> }
          {this.props.in_session && <TeamGameInfo /> }
        </div>
      )
    }
  }
}

const mapStateToProps = state => {

  return ({ ...state.activeGame.game,
  tiles: state.activeGame.tiles,
  in_session: state.activeGame.in_session,
  currentUser: state.currentUser.currentUser,
  active_games: Object.keys(state.activeGame.active_games).map(id => state.activeGame.active_games[id]),
  water_level: state.activeGame.game.water_level,
  loading: state.activeGame.loading})
 }

const connectedActiveGame = connect(mapStateToProps, { addActiveGameUsers, removeActiveGameUsers, addMessage, beginGame, updateGame, handleShoredTile })(ActiveGame)

export default connectedActiveGame
