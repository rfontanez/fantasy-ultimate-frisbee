import { useEffect, useState } from 'react'
import "./styles.css"
import { PlayerList } from './PlayerList'
import { Login } from './Login'
import { RosterList } from './RosterList'

import axios from "axios";

export default function App() {

  const [roster, setRoster] = useState([])
  const [players, setPlayers] = useState([])

  useEffect(() => {
    async function fetchPlayers() {
        try {

            const response = await fetch("http://127.0.0.1:5000/players"); 
            // const response = await fetch("https://www.backend.ufastats.com/web-v1/player-stats?limit=20&teamID=5")
            console.log("Fetch response:", response); // Debug: Log the response object
        
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            
            const responseJson = await response.json(); // Correct variable declaration
            const playersData = responseJson.stats; //stats is needed to grab the right data from the json
            console.log("Fetched players:", playersData); // Debug: Check the fetched players
            // const playersWithID = playersData.map(player => ({
            const playersWithID = playersData.map(player => ({
                ...player,
                id: crypto.randomUUID(),
                rostered: false
            }));

            setPlayers(playersWithID); // Update state with fetched data
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    fetchPlayers(); // Call fetchPlayers function inside useEffect
    }, []); // Empty dependency array to run only once on mount

  // function addToPlayers(player) {
  //   setPlayers(currentPlayers => {
  //     return [
  //       ...players,
  //       {player}
  //     ]
  //   })
  // }

  // function removeFromPlayers(id) {
  //   setPlayers(currentPlayers => {
  //     return currentPlayers.filter(player => player.id !== id)
  //   })
  // }

  // function addToRoster(player) {
  //   // player.rostered = true; //not sure if this is allowed in React ie directly editiing something insteax of remaking the whole list.
  //   setRoster(currentRoster => {
  //     return [
  //       ...currentRoster,
  //       { player }
  //     ]
  //   })
  // }

  function changeList(id) {
    setPlayers(currentPlayers => {
      return currentPlayers.map(player => {
        if (id === player.id) {
          return { ...player, rostered: !player.rostered }
        }
        return player
      }
    )
    })
  }


  // function removeFromRoster(name) {
  //   setRoster( currentRoster => {
  //     return [
  //       currentRoster.filter(player => player.name != name)
  //     ]
  //   })
  // }

  return (
    <>
      <div className='login-container'>
        <h1>Player Login</h1>
        <Login/>
      </div>


      <div className='list-container'>
        <div>
          <h1 className="header">Players</h1>
          <PlayerList 
          players={players} 
          changeList={changeList}
          // addToRoster={addToRoster}
          // removeFromPlayers={removeFromPlayers}
          />
        </div>
        <div>
          <h1 className='header'>Roster</h1>
          <RosterList
          players={players}
          changeList={changeList}
          />
        </div>
      </div>
      
    </>


  )

}




