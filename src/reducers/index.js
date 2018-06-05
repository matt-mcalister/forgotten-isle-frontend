export function currentUserReducer(state = {
  currentUser: null,
  userNameInput: "",
  activeGameId: null
}, action) {
  switch(action.type) {

    case 'UPDATE_USERNAME':
      return {...state, userNameInput: action.userNameInput};
    case "SET_USER":
      return { ...state, currentUser: action.user}
    case "SET_ACTIVE_GAME":
    let activeGameId;
    if (action.active_games.length && state.currentUser && action.active_games[0].active_game){
      const activeGame = action.active_games.find(ag => ag.active_game.user.id === state.currentUser.id)
      if (activeGame){
        activeGameId = activeGame.active_game.id
      }
    }
      return {...state, activeGameId: activeGameId}
    default:
      return state;
  }
}

export function gamesReducer(state = {
  gamesList: [],
  newGameForm: {name: "", water_level: 2}
}, action) {
  switch(action.type) {
    case 'UPDATE_NEW_GAME_FORM':
      return {
        ...state,
        newGameForm: {...state.newGameForm, ...action.newGameForm}
      }
    case 'RESET_NEW_GAME_FORM':
      return {
        ...state,
        newGameForm: action.newGameForm
      }
    case "SET_GAMES_LIST":
      return {
        ...state,
        gamesList: action.gamesList
      }
    case "ADD_GAME_TO_GAMES_LIST":
      return {
        ...state,
        gamesList: [...state.gamesList, action.game.game]
      }
    case "REMOVE_GAME_FROM_GAMES_LIST":
      const filteredGamesList = state.gamesList.filter(game => game.id !== action.game_id)
      return {
        ...state,
        gamesList: filteredGamesList
      }
    default:
      return state
  }
}

export function activeGameReducer(state = {
  game: {water_level: 0},
  newMessageInput: "",
  in_session: false,
  messages: [],
  active_games: {},
  tiles: [],
  shoringAction: false,
  giveTreasureAction: false,
  treasureToGive: null,
  sandbag: undefined,
  helicopterLift: undefined,
  playersToLift: [],
  loading: false,
  pilotFly: false,
  navigatorAction: false,
  navigatorSelectedActiveGame: false,
  engineerAction: false,
  helpMessage: false
}, action) {
  switch(action.type){
    case 'SET_LOADING_TO_TRUE':
      return {...state, loading: true}
    case 'SET_ACTIVE_GAME':
      const initMessages = action.messages.map(msg => msg.message)
      const welcomeMessages = action.active_games.map(ag => {return {alert: "new_active_game", active_game: ag.active_game, id: `${ag.active_game.id} - ${Date.now()}` }} )
      const activeGamesObject = {}
      action.active_games.forEach(ag => activeGamesObject[ag.active_game.id] = ag.active_game)
      return ({
        ...state,
        game: action.game,
        messages: [...initMessages, ...welcomeMessages],
        active_games: activeGamesObject,
        tiles: action.tiles,
        loading:false
      })
    case 'UPDATE_NEW_MESSAGE_INPUT':
      return {...state, newMessageInput: action.newMessageInput}
    case 'ADD_ACTIVE_GAME_USERS':
      const startingActiveGamesNumber = Object.keys(state.active_games).length
      state.active_games[action.active_game.id] = action.active_game
      let messages = state.messages
      if (Object.keys(state.active_games).length !== startingActiveGamesNumber){
        messages = [...state.messages, {alert: "new_active_game", active_game: action.active_game, id: `${action.active_game.id} - ${Date.now()}` }]
      }
      return ({
        ...state,
        active_games: state.active_games,
        messages: messages
      })
    case "REMOVE_ACTIVE_GAME_USERS":
      const newActiveGamesObject = {}
      action.active_games.forEach(ag => newActiveGamesObject[ag.active_game.id] = ag.active_game)
      return {
        ...state,
        game: action.game.game,
        active_games: newActiveGamesObject,
        messages: [...state.messages, {alert: "removed_active_game", active_game: action.removed_active_game, id: `${action.removed_active_game.id} - ${Date.now()}` }]
      }
    case "USER_MUST_DISCARD":
      return {
        ...state,
        messages: [...state.messages, {alert: "user_must_discard", temporary: true, id:`temporary - ${Date.now()}`}]
      }
    case "USER_MUST_RELOCATE":
      return {
        ...state,
        messages: [...state.messages, {alert: "user_must_relocate", temporary: true, id:`temporary - ${Date.now()}`}]
      }
    case "REMOVE_TEMPORARY_MESSAGES":
    let filteredMessages = state.messages.filter(msg => !msg.temporary)
      return {
        ...state,
        messages: filteredMessages
      }
    case "HELP_MESSAGE":
    return {...state, helpMessage: true, messages: [...state.messages, {alert: "help_message", temporary: true, id:`temporary - ${Date.now()}`}]}
    case "RESET_ACTIVE_GAME_STATE":
      return {
        game: {water_level: 0},
        newMessageInput: "",
        in_session: false,
        messages: [],
        active_games: {},
        tiles: [],
        shoringAction: false,
        treasureToGive: null,
        sandbag: undefined,
        helicopterLift: undefined,
        playersToLift: [],
        helpMessage: false
      }
    case "RESET_MESSAGE_INPUT":
      return {...state, newMessageInput: ""}
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.message.message]}
    case "BEGIN_GAME":
      const beginGameActiveGamesObject = {}
      action.active_games.forEach(ag => beginGameActiveGamesObject[ag.active_game.id] = ag.active_game)
      return {
        ...state,
        shoringAction: false,
        in_session: true,
        game: action.game.game,
        tiles: action.tiles,
        active_games: beginGameActiveGamesObject,
        treasureToGive: null
      }
    case "UPDATE_GAME":
      const messagesIds = state.messages.map(msg => msg.id)
      const onlyNewMessages = action.messages.filter(msg => !messagesIds.includes(msg.id))
      const updatedActiveGamesObject = {}
      action.active_games.forEach(ag => updatedActiveGamesObject[ag.active_game.id] = ag.active_game)
      let updatedNavigatorSelectedActiveGame = false
      let updatedNavigatorAction = false
      let updateNavigatorInfo = false
      if (state.navigatorSelectedActiveGame && updatedActiveGamesObject[state.navigatorSelectedActiveGame.currentUserActiveGame.id].actions_remaining === state.active_games[state.navigatorSelectedActiveGame.currentUserActiveGame.id].actions_remaining){
        updateNavigatorInfo = true
      }
      if (updateNavigatorInfo){
        updatedNavigatorSelectedActiveGame = {ag: updatedActiveGamesObject[state.navigatorSelectedActiveGame.ag.id], currentUserActiveGame: updatedActiveGamesObject[state.navigatorSelectedActiveGame.currentUserActiveGame.id] }
        updatedNavigatorAction = true
      }
      let engineerActiveGameId = Object.keys(updatedActiveGamesObject).find(id => updatedActiveGamesObject[id].ability === "Engineer")
      let updatedEngineerAction = false
      if (engineerActiveGameId && updatedActiveGamesObject[engineerActiveGameId].navigations_remaining === 1){
        updatedEngineerAction = true
      }
      return {
        ...state,
        shoringAction: false,
        game: action.game.game,
        tiles: action.tiles,
        active_games: updatedActiveGamesObject,
        giveTreasureAction: false,
        treasureToGive: null,
        messages: [...state.messages, ...onlyNewMessages],
        sandbag: undefined,
        helicopterLift: undefined,
        playersToLift: [],
        pilotFly: false,
        navigatorAction: updatedNavigatorAction,
        navigatorSelectedActiveGame: updatedNavigatorSelectedActiveGame,
        engineerAction: updatedEngineerAction,
        helpMessage: false
      }
    case "TOGGLE_SHORING_ACTION":
      let newShoringAction = !state.shoringAction
      return {
        ...state,
        shoringAction: newShoringAction
      }
    case "TOGGLE_SANDBAG":
      let newSandbag = action.index
      if (newSandbag === state.sandbag){
        newSandbag = false
      }
      return {
        ...state,
        sandbag: newSandbag,
        helicopterLift: undefined
      }
    case "TOGGLE_HELICOPTER_LIFT":
      let newHelicopterLift = action.index
      if (newHelicopterLift === state.helicopterLift){
        newHelicopterLift = false
      }
      let newPlayersToLift = state.playersToLift
      if (!newHelicopterLift && newHelicopterLift !== 0){
        newPlayersToLift = []
      }
      return {
        ...state,
        helicopterLift: newHelicopterLift,
        playersToLift: newPlayersToLift,
        sandbag: undefined
      }
    case "TOGGLE_PILOT_FLY":
      let newPilotFly = !state.pilotFly
      return {...state, pilotFly: newPilotFly}
    case "TOGGLE_ENGINEER_ACTION":
      let newEngineerAction = !state.engineerAction
      return {...state, engineerAction: newEngineerAction}
    case "TOGGLE_NAVIGATOR_ACTION":
      let newNavigatorAction = !state.navigatorAction
      let newNavigatorSelectedActiveGame = state.navigatorSelectedActiveGame
      if (!newNavigatorAction){
        newNavigatorSelectedActiveGame = false
      }
      return {...state, navigatorAction: newNavigatorAction, navigatorSelectedActiveGame: newNavigatorSelectedActiveGame}
    case "SET_NAVIGATOR_SELECTED_ACTIVE_GAME":
      let navigatorSelectedActiveGame = {ag: action.active_game, currentUserActiveGame: action.currentUserActiveGame }
      return {...state, navigatorSelectedActiveGame: navigatorSelectedActiveGame}
    case "ADD_TO_PLAYERS_TO_LIFT":
      return {
        ...state,
        playersToLift: [...state.playersToLift, action.active_game]
      }
    case "REMOVE_PLAYERS_TO_LIFT":
    let filteredPlayersToLift = state.playersToLift.filter(ag => ag.id !== action.active_game_id)
      return {
        ...state,
        playersToLift: filteredPlayersToLift
      }
    case "TOGGLE_GIVE_TREASURE_ACTION":
      let newGiveTreasureAction = !state.giveTreasureAction
      let newMessages;
      if (newGiveTreasureAction){
        newMessages =  [...state.messages, {alert: "select_treasure_to_give", id: Date.now(), temporary: true }]
      } else {
        newMessages = state.messages
      }
      return {
        ...state,
        messages: newMessages,
        giveTreasureAction: newGiveTreasureAction,
        treasureToGive: null
      }
    case "SELECT_TREASURE_TO_GIVE":
      return {
        ...state,
        treasureToGive: action.treasure,
        messages: [...state.messages, {alert: "select_active_game_to_give_to", treasure: action.treasure, id: Date.now(), temporary: true }]
      }
    case "HANDLE_SHORED_TILE":
      let updatedTiles = state.tiles.map(tile => {
        if (tile.tile.id === action.shored_tile.tile.id){
          return action.shored_tile
        } else {
          return tile
        }
      })
      const shoredTileActiveGamesObject = {}
      action.active_games.forEach(ag => shoredTileActiveGamesObject[ag.active_game.id] = ag.active_game)
      return {
        ...state,
        shoringAction: false,
        tiles: updatedTiles,
        active_games: shoredTileActiveGamesObject
      }
    default:
      return state
  }
}
