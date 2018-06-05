import React from "react";
import { connect } from "react-redux"


const TreasureCard = (props) => {
  switch (props.card){
    case "Waters Rise":
      return (
        <div className="treasure-card waters-rise" onClick={() => props.handleClick(props.card, props.id)}>
          <h3>Waters Rise</h3>
        </div>)
    case "Sandbag":
      return (
        <div className="treasure-card sandbag" onClick={() => props.handleClick(props.card, props.id)}>
          {(props.sandbag === props.id && props.userId === props.currentUserActiveGame.id) ? <h3>Cancel Sandbag</h3> : <h3>Sandbag</h3>}
        </div>)
    case "Helicopter Lift":
      return (
        <div className="treasure-card helicopter-lift" onClick={() => props.handleClick(props.card, props.id)}>
          {(props.helicopterLift === props.id && props.userId === props.currentUserActiveGame.id) ? <h3>Cancel Helicopter</h3> : <h3>Helicopter Lift</h3>}
        </div>)
    default:
      const formattedInventoryItem = props.card.toLowerCase().replace(/ /g, "-")
      return (
        <div className={`treasure-card ${formattedInventoryItem}`} onClick={() => props.handleClick(props.card, props.id)}>
          <img src={require(`../treasure-card-icons/${formattedInventoryItem}.png`)}/>
        </div>
      )
  }
}
const mapStateToProps = state => {
  return { sandbag: state.activeGame.sandbag,
    helicopterLift: state.activeGame.helicopterLift,
    currentUserActiveGame: state.activeGame.active_games[state.currentUser.activeGameId]}
}

export default connect(mapStateToProps)(TreasureCard)
