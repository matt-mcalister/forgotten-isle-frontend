import React from "react";
import { handleArrowClick } from "../actions/helperFunctions"
import { connect } from "react-redux"
import { toggleShoringAction, toggleGiveTreasureAction, togglePilotFly, toggleNavigatorAction, toggleEngineerAction } from "../actions"
import { RestfulAdapter } from "../connections/adapter"

class CurrentTurnInterface extends React.Component {
  canGetTreasure(){
    const retrievableTreasure = this.props.active_game["can_get_treasure?"]
    if (retrievableTreasure){
      const currentTile = this.props.tiles.find(tile => tile.tile.position === this.props.active_game.position)
      if (currentTile.tile.treasure === retrievableTreasure){
        const new_actions_remaining = this.props.active_game.actions_remaining - 1
        return (
        <div className="cash-in-button" onClick={() => RestfulAdapter.editFetchToChannel("active_games", this.props.active_game.id, {get_treasure: retrievableTreasure, actions_remaining: new_actions_remaining})}>
          <h3>Retrieve Treasure</h3>
        </div>
        )
      }
    }
  }

  canTrade(){
    if (this.props.active_game["can_trade_cards_with_user?"]){
      return (
        <div className="give-treasure-button" onClick={this.props.toggleGiveTreasureAction}>
          {(!this.props.giveTreasureAction) ? <h3>Give 1 Treasure Token</h3> : <h3>Cancel Give Treasure</h3>}
        </div>)
    }
  }

  endTurn = () => {
    RestfulAdapter.editFetchToChannel("active_games", this.props.active_game.id, {actions_remaining: 0})
  }

  renderNavigationControls = () => {
    let active_game;

    if (this.props.navigatorSelectedActiveGame){
      active_game = this.props.navigatorSelectedActiveGame.ag
    } else {
      active_game = this.props.active_game
    }

    let shoringAction = false;
    if (this.props.engineerAction || this.props.shoringAction){
      shoringAction = true
    }

    if (active_game.ability === "Explorer"){
      return (<div className="navigation-controls">
        <div className="up arrow" onClick={() => handleArrowClick(active_game, "up", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="down arrow" onClick={() => handleArrowClick(active_game, "down", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="left arrow" onClick={() => handleArrowClick(active_game, "left", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="right arrow" onClick={() => handleArrowClick(active_game, "right", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="up-left arrow" onClick={() => handleArrowClick(active_game, "up-left", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="down-right arrow" onClick={() => handleArrowClick(active_game, "down-right", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="down-left arrow" onClick={() => handleArrowClick(active_game, "down-left", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="up-right arrow" onClick={() => handleArrowClick(active_game, "up-right", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="current-location-pin" onClick={() => shoringAction && handleArrowClick(active_game, "currentLocation", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/current_location_pin.png")} />
        </div>
      </div>)
    } else {
      return (<div className="navigation-controls">
        <div className="up arrow" onClick={() => handleArrowClick(active_game, "up", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="down arrow" onClick={() => handleArrowClick(active_game, "down", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="left arrow" onClick={() => handleArrowClick(active_game, "left", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="right arrow" onClick={() => handleArrowClick(active_game, "right", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/arrow.png")} />
        </div>
        <div className="current-location-pin" onClick={() => shoringAction && handleArrowClick(active_game, "currentLocation", this.props.tiles, shoringAction, this.props.navigatorSelectedActiveGame)}>
          <img src={require("../navigation-icons/current_location_pin.png")} />
        </div>
      </div>)
    }
  }

  canFly = () => {
    if (this.props.active_game.can_fly){
      return (
        <div className="pilot-fly-button" onClick={this.props.togglePilotFly}>
          {!this.props.pilotFly ? <h3>Fly to another tile</h3> : <h3>Cancel Flight</h3>}
        </div>
      )
    }
  }

  handleEndNavigation = () => {
    if (this.props.navigatorSelectedActiveGame.currentUserActiveGame.navigations_remaining === 1) {
      RestfulAdapter.editFetchToChannel("active_games", this.props.active_game.id, {actions_remaining: this.props.active_game.actions_remaining - 1, navigations_remaining: 2})
    }
    this.props.toggleNavigatorAction()
  }

  handleEndShore = () => {
    if (this.props.active_game.navigations_remaining === 1) {
      RestfulAdapter.editFetchToChannel("active_games", this.props.active_game.id, {actions_remaining: this.props.active_game.actions_remaining - 1, navigations_remaining: 2})
    }
    this.props.toggleEngineerAction()
  }

  renderNavigatorAction = () => {
    if (this.props.navigatorSelectedActiveGame) {
      return (
        <div className="navigator-button" onClick={this.handleEndNavigation}>
          {!!this.props.navigatorSelectedActiveGame.currentUserActiveGame.navigations_remaining && <h3>End Navigation</h3>}
        </div>
      )
    } else if (this.props.active_game.ability === "Navigator") {
      return (
        <div className="navigator-button" onClick={this.props.toggleNavigatorAction}>
          {!this.props.navigatorAction ? <h3>Navigate another player 2 tiles</h3> : <h3>Cancel Navigation</h3>}
        </div>
      )
    }
  }

  renderShoringAction = () => {
    if (!this.props.active_game["must_relocate?"]){
      if (this.props.active_game.ability === "Engineer"){
        if (this.props.active_game.navigations_remaining === 2) {
          return (
            <div className="shore-up-button" onClick={this.props.toggleEngineerAction}>
              {(this.props.engineerAction) ? <h3>Cancel Shore</h3> : <h3>Shore Up 1 tile</h3>}
            </div>
          )
        } else {
          return (
            <div className="shore-up-button" onClick={this.handleEndShore}>
              <h3>End Shore</h3>
            </div>
          )
        }
      } else {
        return (
        <div className="shore-up-button" onClick={this.props.toggleShoringAction}>
          {(this.props.shoringAction) ? <h3>Cancel Shore</h3> : <h3>Shore Up 1 tile</h3>}
        </div>)
      }
    }
  }

  render() {
    return (
      <div className="current-turn-interface">

        {this.renderNavigationControls()}

        <div className="turn-action-buttons">
          <h3>{`${this.props.active_game.actions_remaining} Actions Remaining`}</h3>
          {this.renderShoringAction()}
          {this.canTrade()}
          {this.canGetTreasure()}
          {this.canFly()}
          {this.renderNavigatorAction()}
          <div className="end-turn-button" onClick={this.endTurn}>
            <h3>End Turn</h3>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, props) => {

  return {
    tiles: state.activeGame.tiles,
    shoringAction: state.activeGame.shoringAction,
    giveTreasureAction: state.activeGame.giveTreasureAction,
    pilotFly: state.activeGame.pilotFly,
    navigatorAction: state.activeGame.navigatorAction,
    navigatorSelectedActiveGame: state.activeGame.navigatorSelectedActiveGame,
    engineerAction: state.activeGame.engineerAction}
}

export default connect(mapStateToProps, { toggleShoringAction, toggleGiveTreasureAction, togglePilotFly, toggleNavigatorAction, toggleEngineerAction })(CurrentTurnInterface)
