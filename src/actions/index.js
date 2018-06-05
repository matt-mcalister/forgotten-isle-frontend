import { RestfulAdapter } from "../connections/adapter.js"

export function updateUserNameInput(username) {
  return { type: "UPDATE_USERNAME", userNameInput: username };
}

export function setUser(name) {
  return dispatch => {
    return RestfulAdapter.createFetch("users", {user: {name: name}})
    .then(data => { dispatch({ type: "SET_USER", user: data }) } );
  }
}

export function getGames() {
  return (dispatch) => {
    RestfulAdapter.indexFetch("games")
      .then(data => { dispatch({type: "SET_GAMES_LIST", gamesList: data}) } );
  }
}

export function addGameToGamesList(game) {
  return { type: "ADD_GAME_TO_GAMES_LIST", game: game }
}

export function removeGameFromGamesList(game_id) {
  return { type: "REMOVE_GAME_FROM_GAMES_LIST", game_id: game_id }
}

export function updateNewGameForm(e) {
  let value;
  if (e.target.name === "water_level") {
    value = parseInt(e.target.value, 10)
  } else {
    value = e.target.value
  }
  return { type: "UPDATE_NEW_GAME_FORM", newGameForm: {[e.target.name]: value}}
}

export function createNewGame(newGameForm) {
  RestfulAdapter.createFetchToChannel("games", newGameForm)
  return { type: "RESET_NEW_GAME_FORM", newGameForm: {name: "", water_level: 2} }
}

export function setActiveGame(game, user_id){

  return (dispatch) => {
    dispatch({ type: "SET_LOADING_TO_TRUE"})
    RestfulAdapter.createFetchToChannel("active_games", {user_id: user_id, game_id: game.id})
      .then(() => RestfulAdapter.showFetch("games", game.id).then(data => dispatch({ type: "SET_ACTIVE_GAME", game: data.game.game, active_games: data.active_games, messages: data.messages, tiles: data.tiles })))
  }
}

export function updateNewMessageInput(newMessageInput){
  return { type: "UPDATE_NEW_MESSAGE_INPUT", newMessageInput: newMessageInput }
}

export function addActiveGameUsers(active_game){
  return { type: "ADD_ACTIVE_GAME_USERS", active_game: active_game}
}

export function toggleReadyUp(active_game){
  RestfulAdapter.editFetchToChannel("active_games", active_game.id, {active_game: {ready_to_start: !active_game.ready_to_start }})
  return { type: "TOGGLE_READY_UP" }
}

export function removeActiveGameUsers(game, removed_active_game, active_games){
  return { type: "REMOVE_ACTIVE_GAME_USERS", removed_active_game: removed_active_game, game: game, active_games: active_games}
}

export function resetActiveGameState(){
  return { type: "RESET_ACTIVE_GAME_STATE" }
}

export function addMessage(data){
  return { type: "ADD_MESSAGE", message: data}
}

export function beginGame(data){
  return { type: "BEGIN_GAME", game: data.game, active_games: data.active_games, tiles: data.tiles }
}

export function updateGame(data){
  let alertMessages = data.messages.map(msg => msg.message)
  return { type: "UPDATE_GAME", game: data.game, active_games: data.active_games, tiles: data.tiles, messages: alertMessages }
}

export function toggleShoringAction(){
  return { type: "TOGGLE_SHORING_ACTION" }
}

export function toggleSandbag(index){
  return { type: "TOGGLE_SANDBAG", index: index }
}

export function toggleHelicopterLift(index){
  return { type: "TOGGLE_HELICOPTER_LIFT", index: index }
}

export function toggleGiveTreasureAction(){
  return { type: "TOGGLE_GIVE_TREASURE_ACTION" }
}

export function handleShoredTile(data){
  return { type: "HANDLE_SHORED_TILE", shored_tile: data.shored_tile, updated_active_game: data.updated_active_game}
}

export function selectTreasureToGive(treasure){
  return { type: "SELECT_TREASURE_TO_GIVE", treasure: treasure }
}

export function addToPlayersToLift(active_game){
  return {type: "ADD_TO_PLAYERS_TO_LIFT", active_game: active_game }
}

export function userMustDiscard(){
  return { type: "USER_MUST_DISCARD" }
}

export function userMustRelocate(){
  return { type: "USER_MUST_RELOCATE" }
}

export function removeTemporaryMessages(){
  return { type: "REMOVE_TEMPORARY_MESSAGES"}
}

export function resetMessageInput(){
  return { type: "RESET_MESSAGE_INPUT"}
}

export function removePlayersToLift(id){
  return { type: "REMOVE_PLAYERS_TO_LIFT", active_game_id: id}
}

export function togglePilotFly(){
  return { type: "TOGGLE_PILOT_FLY" }
}

export function toggleNavigatorAction(){
  return { type: "TOGGLE_NAVIGATOR_ACTION" }
}

export function setNavigatorSelectedActiveGame(active_game, currentUserActiveGame){
  return { type: "SET_NAVIGATOR_SELECTED_ACTIVE_GAME", active_game: active_game, currentUserActiveGame: currentUserActiveGame }
}

export function toggleEngineerAction(){
  return { type: "TOGGLE_ENGINEER_ACTION" }
}

export function helpMessage(){
  return { type: "HELP_MESSAGE" }
}
