
// NOTE: To activate virtual environment, cd into .venv from ultimate folder, then run: "source bin/activate"

let playerlist = document.getElementById('player-list'); //should these be const? cause im trying to change them later, not sure
let rosterlist = document.getElementById('roster-list');
let rosterlistCounter = 0;


let players = {}//this is an object now, will use as dictionary
//     {name:'Alex Atkins', team: 'Colorado Summit'},
//     {name: 'Jeff Babbit', team: 'Boston Glory'}
// ];

let roster = {};//this is an object now

//note
async function fetchPlayers() {

    
    try {

        const response = await fetch('http://127.0.0.1:5000/players');// /players means it goes to the function that @app.route says
        console.log('Fetch response:', response);  // Debug: Log the response object

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        players = await response.json();
        console.log(players);  // Debug: Check the fetched players
        return players;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


function renderPlayerList(players) {
    playerlist.innerHTML = '';
    console.log(' trying to renderPlayerList:', players);
    players.forEach(player => {
        addToPlayerList(player);
    });
}

function addToPlayerList(player) {
    const playerItem = document.createElement('li');
    playerItem.textContent = `${player.name} - ${player.goals}`;
    const addButton = document.createElement('button');
    addButton.textContent = '+';

    // addButton.onclick = () => addToRoster(player) ;
    addButton.onclick = () => addToRoster(playerItem, player);

    playerItem.appendChild(addButton);
    playerlist.appendChild(playerItem);
}

function addToRoster(playerItem, player) {

    //Question: Is this actually able to access players object? ie scope?
    // players.splice(players.indexOf(player),1);
    
    
    // renderPlayerList(players);
    if (rosterlistCounter < 12) {
        const rosterItem = document.createElement('li');
        rosterItem.textContent = `${player.name} - ${player.goals}`;
        rosterlist.appendChild(rosterItem);
        const addButton = document.createElement('button');
        addButton.textContent = '-';
        
        // addButton.onclick = () => removeFromRoster(rosterItem, player);
        addButton.addEventListener('click', () => removeFromRoster(rosterItem, player));

        rosterItem.appendChild(addButton);
        rosterlist.appendChild(rosterItem);
        console.log('players in rosterlist:', rosterlist);

        // remove player from playerlist
        playerlist.removeChild(playerItem);
        rosterlistCounter++;
    }
    else {alert("Roster Full")}
}


function removeFromRoster(rosterItem, player) {

    const playerItem = document.createElement('li');
    playerItem.textContent = `${player.name} - ${player.goals}`;
    const addButton = document.createElement('button');
    addButton.textContent = '+';

    // addButton.onclick = () => addToRoster(playerItem, player);
    addButton.addEventListener('click', () => addToRoster(playerItem, player));

    playerItem.appendChild(addButton);
    playerlist.appendChild(playerItem);
    rosterlist.removeChild(rosterItem);
    rosterlistCounter--;

    // players.push(player);

}


//note
fetchPlayers().then(players => {
    if (players) {
        console.log('Players to render :', players);
        renderPlayerList(players);
    }
});
//renderPlayerList();


