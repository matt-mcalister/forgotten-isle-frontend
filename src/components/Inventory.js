import React from "react";
import TreasureCard from "./TreasureCard"
import { connect } from "react-redux"
import { selectTreasureToGive, toggleSandbag, toggleHelicopterLift } from "../actions"
import { RestfulAdapter } from "../connections/adapter"


class Inventory extends React.Component {

  handleCardClick = (card, index) => {
    if (this.props.id === this.props.currentUserActiveGame.id && !this.props.currentUserActiveGame["must_relocate?"]) {
      if (this.props.giveTreasureAction){
        this.props.selectTreasureToGive(card)
      } else if (this.props.currentUserActiveGame["must_discard?"]){
        let body = {card_to_discard: card, actions_remaining: this.props.currentUserActiveGame.actions_remaining}
        RestfulAdapter.editFetchToChannel("active_games", this.props.currentUserActiveGame.id, body)
      } else if (card === "Sandbag") {
        this.props.toggleSandbag(index)
      } else if (card === "Helicopter Lift"){
        this.props.toggleHelicopterLift(index)
      }
    }
  }

  handleInventoryClick = () => {
    if (this.props.treasureToGive && (this.props.currentUserActiveGame.ability === "Messenger" || (this.props.id !== this.props.currentUserActiveGame.id && this.props.position === this.props.currentUserActiveGame.position))){
      const new_actions_remaining = this.props.currentUserActiveGame.actions_remaining - 1
      let body = {gift_treasure: this.props.treasureToGive, gift_to: this.props.id, actions_remaining: new_actions_remaining}
      RestfulAdapter.editFetchToChannel("active_games", this.props.currentUserActiveGame.id, body)
    }
  }

  render(){
    const inventoryClass = (this.props.currentUserActiveGame.id === this.props.id) ? "current-user-inventory" : "team-inventory"
    return (
      <div className={`inventory ${inventoryClass}`} onClick={this.handleInventoryClick}>
        <p className={`inventory-name ${this.props.ability.toLowerCase()}`}>{`${this.props.user.name}'s Inventory`}</p>
        <div className="treasure-cards-container">
        {this.props.treasure_cards && this.props.treasure_cards.map((card, index) => <TreasureCard key={`card-${index}`} userId={this.props.id} handleClick={this.handleCardClick} id={index} card={card}/>)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    giveTreasureAction: state.activeGame.giveTreasureAction,
    treasureToGive: state.activeGame.treasureToGive
  })
}

export default connect(mapStateToProps, { selectTreasureToGive, toggleSandbag, toggleHelicopterLift })(Inventory)
