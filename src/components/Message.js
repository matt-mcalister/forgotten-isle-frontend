import React from "react";
import { connect } from "react-redux"

const Message = (props) => {
  if (props.message.alert){
    switch (props.message.alert){
      case "new_active_game":
        if (props.message.active_game.user.id === props.currentUser.id){
          return (
            <div className="alert">
            <p>{`Welcome to Forgotten Isle, ${props.message.active_game.user.name}! You are the ${props.message.active_game.ability}.`}</p>
            </div>)
        } else {
          return (
            <div className="alert">
            <p>{`${props.message.active_game.user.name} the ${props.message.active_game.ability} has joined your cause!`}</p>
            </div>)
        }
      case "removed_active_game":
        return (
              <div className="alert">
                <p>{`${props.message.active_game.user.name} has exited the Island.`}</p>
              </div>)
      case "select_treasure_to_give":
        return (
          <div className="alert">
            <p>CLICK ON AN ITEM IN YOUR INVENTORY TO GIVE:</p>
          </div>
        )
      case "select_active_game_to_give_to":
        return (
          <div className="alert">
            <p>CLICK ON A FELLOW ADVENTURERs INVENTORY TO GIVE THEM YOUR {props.message.treasure.replace(/THE /, "").toUpperCase()} TOKEN </p>
            {props.currentUserActiveGame.ability !== "Messenger" && <p>NOTE: ADVENTURER MUST BE ON THE SAME TILE</p>}
          </div>
        )
      case "user_must_discard":
        return (
          <div className="alert">
            <p>Select a card to discard before continuing</p>
          </div>
        )
      case "user_must_relocate":
        return (
          <div className="alert">
            <p>Your current tile has sunken into the abyss! Move to an adjacent tile before continuing</p>
          </div>
        )
      case "help_message":
        let classInfo;
        switch (props.currentUserActiveGame.ability){
          case "Engineer":
            classInfo = "You are the Engineer. On your turn, you have the ability to shore up 2 tiles for one action."
            break;
          case "Pilot":
            classInfo = "You are the Pilot. Once per turn, you have the ability to fly to any tile on the island for one action."
            break;
          case "Messenger":
            classInfo = "You are the Messenger. On your turn, you have the ability to give treasure cards to a player anywhere on the island for one action."
            break;
          case "Diver":
            classInfo = "You are the Diver. On your turn, you have the ability to swim through one or more adjacent flooded and/or sunken tiles for one action."
            break;
          case "Explorer":
            classInfo = "You are the Explorer. On your turn, you have the ability to move and/or shore up diagonally for one action."
            break;
          case "Navigator":
            classInfo = "You are the Navigator. On your turn, you have the ability to move another player up to 2 adjacent tiles for one action."
            break;
          default:
            classInfo = "You current do not have an ability. Exit the game."
        }
        return (
          <div className="alert">
            <p>Your objective is simple: work with your team to collectively obtain all four treasures and make it back to Fools Landing to escape before the Island sinks into the abyss.</p>
            <p>In order to capture treasure, you must trade in 4 or more of the appropriate treasure tokens while on the corresponding tile. Each treasure can be obtained on one of two tiles.</p>
            <p>As the game progresses, the island will continually flood and certain areas will sink into the abyss. When a tile has flooded, you can use one action to shore it up to temporarily prevent it from sinking.</p>
            <p>Each turn, you can take up to three of the following actions:</p>
              <ul>
                <li>Move to another tile</li>
                <li>Shore up your tile or an adjacent tile</li>
                <li>Give another player an item from your inventory</li>
                <li>Trade in treasure tokens for a treasure</li>
              </ul>
            <p>Additionally, you will obtain Sandbags and Helicopter Lifts. These are action cards that can be used at any time, not just during your turn, and do not cost any actions. The Sandbag allows you to shore up any one tile on the island. The Helicopter Lift allows you to move one or more players on the same tile to any other tile on the island. In addition, in order to successfully escape the island, one player must have a Helicopter Lift pass in their inventory.</p>
            <p>Each player has a different specialty, which grants them special abilities to be used on their turn:</p>
            <p>{classInfo}</p>
          </div>
        )
      default:
        return (
          <div className="alert">
            <p>{props.message.text}</p>
          </div>)
    }
  } else {
    if (props.message.user.id === props.currentUser.id) {
      return (
        <div className="message current-user-msg">
          <p><b>{`${props.message.user.name}`}</b>{`: ${props.message.text}`}</p>
        </div>
      )
    } else {
      return (
        <div className="message team-msg">
          <p><b>{`${props.message.user.name}`}</b>{`: ${props.message.text}`}</p>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.currentUser,
    currentUserActiveGame: state.activeGame.active_games[state.currentUser.activeGameId]
  }
}
export default connect(mapStateToProps)(Message)
