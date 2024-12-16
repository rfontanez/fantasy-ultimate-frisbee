import { useEffect, useState } from "react"
import { Player } from "./Player";

export function PlayerList({ 
  players, 
  // addToRoster, 
  // removeFromPlayers
  changeList
}) {
    return (
      <ul className="js-player-list">
        {players.length === 0 && "Players unable to load"}
        {players.map(player => {
          if (!player.rostered) {
            return (
              <Player
                player
                {...player}
                key={player.id}
                // addToRoster={addToRoster}
                // removeFromPlayers={removeFromPlayers}
                changeList={changeList}
                buttonText="Add"
              />
            )
          }
        })}
      </ul>
    )

}




