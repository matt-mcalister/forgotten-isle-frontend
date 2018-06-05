import React from "react";
import { connect } from "react-redux"
import { toggleReadyUp } from "../actions"

const ReadyUpButton = (props) => {
  switch (props.active_game.user.id) {
    case props.currentUser.id:
      const user_color = (props.active_game.ready_to_start) ? "green" : "red"
      const user_message = (props.active_game.ready_to_start) ? "Ready!" : "Not ready"
      return (
        <div className="ready-up-button" onClick={() => props.toggleReadyUp(props.active_game) } style={{
          "backgroundColor": user_color
        }}>
          <p className="ready-up-message">{user_message}</p>
        </div>
      );
    default:
      const color = (props.active_game.ready_to_start) ? "green" : "red"
      const message = (props.active_game.ready_to_start) ? "Ready!" : "Not ready"
      return (
        <div className="ready-up-button" style={{
          "backgroundColor": color
        }}>
          <p className="ready-up-message">{message}</p>
        </div>
      );
  }
}
export default connect(state => ({currentUser: state.currentUser.currentUser}), { toggleReadyUp })(ReadyUpButton)
