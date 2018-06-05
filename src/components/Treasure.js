import React from "react";

const Treasure = (props) =>  {
  const formattedInventoryItem = props.card.toLowerCase().replace(/ /g, "-")
    return (
      <div className={`obtained-treasure ${formattedInventoryItem}`} onClick={() => props.handleClick(props.card)}>
        <img src={require(`../treasure-card-icons/${formattedInventoryItem}.png`)}/>
        <h3>{props.card}</h3>
      </div>
    )
}
export default Treasure
