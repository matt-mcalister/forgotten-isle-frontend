import React from "react";
import { connect } from "react-redux";
import { updateNewGameForm, createNewGame } from "../actions"



class NewGameForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createNewGame(this.props.newGameForm)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="new-game-form">
        <input name="name" type="text" placeholder="Enter name of game..." value={this.props.newGameForm.name} onChange={this.props.updateNewGameForm}/>
        <br />
        <select name="water_level" value={this.props.newGameForm.water_level} onChange={this.props.updateNewGameForm}>
          <option value={1}>Novice</option>
          <option value={2}>Normal</option>
          <option value={3}>Elite</option>
          <option value={4}>Legendary</option>
        </select>
        <br />
        <input className="submit" type="submit" value="Create Game" />
      </form>
    )
  }
}
export default connect(state => ({ newGameForm: state.games.newGameForm }), { updateNewGameForm, createNewGame })(NewGameForm)
