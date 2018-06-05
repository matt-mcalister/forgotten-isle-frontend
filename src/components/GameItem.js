import React from "react";
import "../stylesheets/lobby.css"
import { connect } from "react-redux";
import { setActiveGame } from "../actions"
import { withRouter } from 'react-router-dom'



class GameItem extends React.Component {

  waterLevelDescription = () => {
    switch (this.props.game.water_level) {
      case 1:
        return "Novice";
      case 2:
        return "Normal";
      case 3:
        return "Elite"
      case 4:
        return "Legendary"
      default:
        return "no level set"
    }
  }

  handleClick = (e) => {
    this.props.setActiveGame(this.props.game, this.props.currentUser.id)
    this.props.history.push(`/games/${this.props.game.id}`)
  }

  render() {
    return (
      <div className="game-item" id={this.props.game.id} onClick={this.handleClick}>
        <h3>{this.props.game.name}</h3>
        <p>Starting Water Level: {this.waterLevelDescription()}</p>
      </div>
    )
  }
}

const connectedGameItem = connect(state => ({ currentUser: state.currentUser.currentUser }), { setActiveGame })(GameItem)

export default withRouter(connectedGameItem)
