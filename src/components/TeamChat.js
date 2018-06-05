import React from "react";
import { connect } from "react-redux"
import Message from "./Message"
import { updateNewMessageInput, resetMessageInput, helpMessage } from "../actions"
import { RestfulAdapter } from "../connections/adapter.js"


class TeamChat extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.newMessageInput.toLowerCase() === "help"){
      this.props.helpMessage()
    } else {
      const messageBody = {
        text: this.props.newMessageInput,
        user_id: this.props.currentUser.id,
        game_id: this.props.game.id
      }
      RestfulAdapter.createFetchToChannel("messages", messageBody)
    }
    this.props.resetMessageInput()
  }

  handleChange = (e) => {
    this.props.updateNewMessageInput(e.target.value)
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="team-chat">
        <div className="messages-container">
        {this.props.messages.map(msg => <Message key={msg.id} message={msg}/>)}
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.props.newMessageInput} onChange={this.handleChange} placeholder="Type to chat. Type 'help' for instructions." />
          <input className="submit" type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    messages: state.activeGame.messages,
    currentUser: state.currentUser.currentUser,
    newMessageInput: state.activeGame.newMessageInput,
    game: state.activeGame.game
  })
}

export default connect(mapStateToProps, { updateNewMessageInput, resetMessageInput, helpMessage })(TeamChat)
