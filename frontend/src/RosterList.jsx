import { useEffect, useState } from "react"
import { Player } from "./Player";

export function RosterList({
    players,
    changeList
}) {
    return (
        <ul className="js-roster-list">
            {players.length === 0 && "Roster Empty"}
            {players.map(player => {
                if (player.rostered) {
                    return (
                        <Player
                        player
                        {...player}
                        key={player.id}
                        changeList={changeList}
                        buttonText="Remove"
                        />
                    )
                }
            })}

        </ul>
    )
}