import React from "react";
import { connect } from "react-redux";
import { updateUserNameInput, setUser } from '../actions'
import "../stylesheets/welcome.css"

class Welcome extends React.Component {



  handleChange = (e) => {
    this.props.updateUserNameInput(e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.setUser(this.props.userNameInput).then(() => this.props.routerProps.history.push("/"))
  }

  render() {
    return (
      <div id="welcome-page">
        <div id="welcome-message">
          <h1>Forgotten Isle</h1>
        </div>
        <form onSubmit={this.handleSubmit} id={"login-form"}>
          <input type="text" value={this.props.userNameInput} onChange={this.handleChange} placeholder="Enter your name here..." />
          <br />
          <input type="submit" className={"submit"} value="Adventure!"/>
        </form>
      </div>
    )
  }
}

export default connect(state =>  ({userNameInput: state.currentUser.userNameInput}), { updateUserNameInput, setUser })(Welcome);
