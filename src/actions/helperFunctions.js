import {RestfulAdapter} from "../connections/adapter"

export function handleArrowClick(active_game, direction, tiles, shoringAction, navigatorSelectedActiveGame) {
  switch (direction){
    case "up":
      switch (active_game.position){
        case 1:
        case 2:
        case 3:
        case 6:
        case 7:
        case 12:
          return false;
        default:
          executeMove(active_game, "up", tiles, shoringAction, navigatorSelectedActiveGame)
          return true;
      }
    case "down":
      switch (active_game.position){
        case 24:
        case 23:
        case 22:
        case 19:
        case 13:
        case 18:
          return false;
        default:
          executeMove(active_game, "down", tiles, shoringAction, navigatorSelectedActiveGame)
          return true;
      }
    case "left":
      switch (active_game.position){
        case 1:
        case 3:
        case 7:
        case 13:
        case 19:
        case 23:
          return false;
        default:
          executeMove(active_game, "left", tiles, shoringAction, navigatorSelectedActiveGame)
          return true;
      }
    case "right":
      switch (active_game.position){
        case 2:
        case 6:
        case 12:
        case 18:
        case 22:
        case 24:
          return false;
        default:
          executeMove(active_game, "right", tiles, shoringAction, navigatorSelectedActiveGame)
          return true;
      }
    case "up-left":
      switch(active_game.position){
        case 1:
        case 2:
        case 3:
        case 4:
        case 7:
        case 8:
        case 13:
         return false;
        default:
          executeMove(active_game, "up-left", tiles, shoringAction, navigatorSelectedActiveGame)
          return true
      }
    case "up-right":
      switch(active_game.position){
        case 1:
        case 2:
        case 5:
        case 6:
        case 11:
        case 12:
        case 18:
         return false;
        default:
          executeMove(active_game, "up-right", tiles, shoringAction, navigatorSelectedActiveGame)
          return true
      }
    case "down-left":
      switch(active_game.position){
        case 23:
        case 24:
        case 19:
        case 20:
        case 13:
        case 14:
        case 7:
         return false;
        default:
          executeMove(active_game, "down-left", tiles, shoringAction, navigatorSelectedActiveGame)
          return true
      }
    case "down-right":
      switch(active_game.position){
        case 23:
        case 24:
        case 21:
        case 22:
        case 17:
        case 18:
        case 12:
         return false;
        default:
          executeMove(active_game, "down-right", tiles, shoringAction, navigatorSelectedActiveGame)
          return true
      }
    case "currentLocation":
      executeMove(active_game, "currentLocation", tiles, shoringAction, navigatorSelectedActiveGame)
      break;
    default:
      return false
  }
}

function moveUp(position){
  switch(position){
    case 24:
    case 23:
      return (position - 3)
    case 22:
    case 21:
    case 20:
    case 19:
      return (position - 5)
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
      return (position - 6)
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
      return (position - 5)
    case 6:
    case 5:
    case 4:
    case 3:
      return (position - 3)
    default:
      return false
  }
}

function moveDown(position){
  switch(position){
    case 1:
    case 2:
      return (position + 3)
    case 3:
    case 4:
    case 5:
    case 6:
      return (position + 5)
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      return (position + 6)
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      return (position + 5)
    case 19:
    case 20:
    case 21:
    case 22:
      return (position + 3)
    default:
      return false
  }
}

function moveRight(position){
  return position + 1
}

function moveLeft(position){
  return position - 1
}

function tileExists(tiles, newPosition) {
  let newTile = tiles.find(tile => tile.tile.position === newPosition)
  if (newTile.tile.status === "abyss"){
    return false
  } else {
    return true
  }
}

function diverSwimming(tiles, newPosition, active_game, shoringAction, navigatorSelectedActiveGame){
  if (!shoringAction && active_game.ability === "Diver"){
    let newTile = tiles.find(tile => tile.tile.position === newPosition)
    if (newTile.tile.status === "dry") {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

function executeMove(active_game, direction, tiles, shoringAction, navigatorSelectedActiveGame){
  let newPosition;
  switch(direction){
    case "up":
      newPosition = moveUp(active_game.position)
      break;
    case "down":
      newPosition = moveDown(active_game.position)
      break;
    case "left":
      newPosition = moveLeft(active_game.position)
      break;
    case "right":
      newPosition = moveRight(active_game.position)
      break;
    case "up-left":
      newPosition = moveLeft(moveUp(active_game.position))
      break;
    case "up-right":
      newPosition = moveRight(moveUp(active_game.position))
      break;
    case "down-left":
      newPosition = moveLeft(moveDown(active_game.position))
      break;
    case "down-right":
      newPosition = moveRight(moveDown(active_game.position))
      break;
    case "currentLocation":
      newPosition = active_game.position
      break;
    default:
      return false
  }
  let diverAction = diverSwimming(tiles, newPosition, active_game, shoringAction, navigatorSelectedActiveGame)
  if (diverAction || tileExists(tiles, newPosition)) {

    let currentUserActiveGame;
    let fetchBody = {}
    if (navigatorSelectedActiveGame){
      currentUserActiveGame = navigatorSelectedActiveGame.currentUserActiveGame
      if (!diverAction){
        fetchBody.navigations_remaining = navigatorSelectedActiveGame.currentUserActiveGame.navigations_remaining - 1
      } else {
        fetchBody.navigations_remaining = navigatorSelectedActiveGame.currentUserActiveGame.navigations_remaining
      }
      fetchBody.navigating_id = active_game.id
      fetchBody.navigating_position = newPosition
    } else {
      currentUserActiveGame = active_game
    }

    let new_actions_remaining = currentUserActiveGame.actions_remaining
    if ((navigatorSelectedActiveGame || shoringAction) && fetchBody.navigations_remaining === 0) {
      new_actions_remaining = new_actions_remaining - 1
      fetchBody.navigations_remaining = 2
    } else if (!active_game["must_relocate?"] && !diverAction && !navigatorSelectedActiveGame){
      new_actions_remaining = new_actions_remaining - 1
    }

    fetchBody.actions_remaining = new_actions_remaining
    if (shoringAction) {
      if (canBeShored(tiles, newPosition)) {
        fetchBody.shoring = newPosition
        if (active_game.ability === "Engineer"){
          fetchBody.navigations_remaining = active_game.navigations_remaining - 1
        }
        if (fetchBody.navigations_remaining === 1){
          fetchBody.actions_remaining = active_game.actions_remaining
        } else {
          fetchBody.actions_remaining = active_game.actions_remaining - 1
        }
        RestfulAdapter.editFetchToChannel("active_games", active_game.id, fetchBody)
      }
    } else {
      if (!fetchBody.navigating_id){
        fetchBody.position = newPosition
      }
      RestfulAdapter.editFetchToChannel("active_games", currentUserActiveGame.id, fetchBody)
    }
  }
}

function canBeShored(tiles, newPosition){
  let newTile = tiles.find(tile => tile.tile.position === newPosition)
  if (newTile.tile.status === "wet"){
    return true
  } else {
    return false
  }
}
