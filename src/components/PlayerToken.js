import React from "react";
import { HEADERS, API_ROOT } from "../connections/constants"
import { connect } from "react-redux"
import { resetActiveGameState, addToPlayersToLift, removePlayersToLift, setNavigatorSelectedActiveGame } from "../actions"

class PlayerToken extends React.Component {
  state = {
    height: "3.5vmin",
    width: "3.5vmin"
  }


  componentDidMount = () => {
    window.addEventListener("beforeunload", this.clearActiveGameUser)
  }

  clearActiveGameUser = () => {
    if (this.props.currentUser.id === this.props.user.id) {
      fetch(`${API_ROOT}/active_games/${this.props.id}`, {
        method: "DELETE",
        headers: HEADERS(),
      })
      this.props.resetActiveGameState()
    }
  }

  handleMouseOver = () => {
    if (this.props.helicopterLift || (this.props.navigatorAction && this.props.id !== this.props.currentUserActiveGame.id)) {
      this.setState({height: "4vmin", width:"4vmin"})
    }
  }

  handleMouseOut = () => {
    this.setState({height: "3.5vmin", width:"3.5vmin"})
  }

  handleClick = (e) => {
    if ((this.props.helicopterLift >= 0) && (this.props.helicopterStartingPosition === 0 || this.props.helicopterStartingPosition === this.props.position)) {
      if (this.props.borderWidth === 1){
        this.props.removePlayersToLift(this.props.id)
      } else {
        this.props.addToPlayersToLift({id: this.props.id, position: this.props.position})
      }
    } else if (this.props.navigatorAction && this.props.id !== this.props.currentUserActiveGame.id) {
      this.props.setNavigatorSelectedActiveGame(this.props.active_game, this.props.currentUserActiveGame)
    }
  }

  componentWillUnmount(){
    this.clearActiveGameUser()
  }

  render() {
    if (!this.props.end_game){
      return (
        <div className={`player-token cell-${this.props.position} ${this.props.ability}`}
        style={{ "border": `${this.props.borderWidth}em solid orange`, "height":this.state.height, "width":this.state.width }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}>
          <img className="player-token-image" src={require(`../player-icons/${this.props.ability.toLowerCase()}.png`)}/>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = (state, props) => {
  let helicopterStartingPosition = 0
  if (state.activeGame.playersToLift[0]){
    helicopterStartingPosition = state.activeGame.playersToLift[0].position
  }
  let borderWidth = 0
  if (state.activeGame.playersToLift.find(ag => ag.id === props.id) || (state.activeGame.navigatorSelectedActiveGame && state.activeGame.navigatorSelectedActiveGame.ag.id === props.id)){
    borderWidth = 0.2
  }

  return {
    currentUser: state.currentUser.currentUser,
    helicopterLift: state.activeGame.helicopterLift,
    helicopterStartingPosition: helicopterStartingPosition,
    playersToLift: state.activeGame.playersToLift,
    end_game: state.activeGame.game.end_game,
    borderWidth: borderWidth,
    navigatorAction: state.activeGame.navigatorAction,
    currentUserActiveGame: state.activeGame.active_games[state.currentUser.activeGameId],
    active_game: state.activeGame.active_games[props.id]
  }
}
export default connect(mapStateToProps, { resetActiveGameState, addToPlayersToLift, removePlayersToLift, setNavigatorSelectedActiveGame })(PlayerToken)
