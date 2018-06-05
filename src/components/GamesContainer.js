import React from "react";
import { connect } from "react-redux";
import { getGames, addGameToGamesList, removeGameFromGamesList } from "../actions"
import GameItem from "./GameItem"
import { ActionCable } from 'react-actioncable-provider';


class GamesContainer extends React.Component {

  componentDidMount(){
    this.props.getGames()
  }

  handleReceivedData = (data) => {
    if (data.game_in_session){
      this.props.removeGameFromGamesList(data.game_in_session)
    } else {
      this.props.addGameToGamesList(data)
    }
  }

  render() {
    return (
      <div id="games-container">
        <ActionCable
           channel={{ channel: 'GamesChannel' }}
           onReceived={this.handleReceivedData}
           />
        {this.props.gamesList.map(game => <GameItem key={game.id} game={game} />)}
      </div>
    )
  }
}
export default connect(state => ({ gamesList: state.games.gamesList }), { getGames, addGameToGamesList, removeGameFromGamesList })(GamesContainer)
