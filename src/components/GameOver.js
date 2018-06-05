import React from "react";

const GameOver = (props) => {
  return (
    <div className="game-over">
      <h2 className="game-over-message">{props.result}</h2>
    </div>
  )
}
export default GameOver
