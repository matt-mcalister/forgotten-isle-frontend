import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import registerServiceWorker from './registerServiceWorker';
import thunk from "redux-thunk"
import { ActionCableProvider } from 'react-actioncable-provider';
import { BrowserRouter as Router } from 'react-router-dom'

import { composeWithDevTools } from 'redux-devtools-extension';


import "./stylesheets/index.css"
import "./stylesheets/lobby.css"
import "./stylesheets/welcome.css"
import "./stylesheets/active-game.css"
import "./stylesheets/game-board.css"
import "./stylesheets/inventory.css"
import "./stylesheets/turn-interface.css"
import "./stylesheets/chat.css"

import { API_WS_ROOT } from './connections/constants';
import { gamesReducer, currentUserReducer, activeGameReducer } from './reducers';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  games: gamesReducer,
  activeGame: activeGameReducer
})



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ActionCableProvider>,
  document.getElementById('root'));
registerServiceWorker();
