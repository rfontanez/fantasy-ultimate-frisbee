
// NOTE: To activate virtual environment, cd into .venv from ultimate folder, then run: "source bin/activate"

let playerlist = document.getElementById('player-list'); //should these be const? cause im trying to change them later, not sure
let rosterlist = document.getElementById('roster-list');
let rosterlistCounter = 0;

let players =[];
let roster = [];

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




function renderPlayerList() {
    let playerListHTML = '';

    players.forEach((player, index) => {
        const { name, goals } = player;
        const html = `
            <div>${name}</div>
            <div>${goals}</div>
            <button class="add-roster-button js-add-roster-button">+</button>
        `;
        playerListHTML += html;
    });

    document.querySelector('.js-player-list')
        .innerHTML = playerListHTML;
    document.querySelectorAll('.js-add-roster-button')
        .forEach((addRosterButton, index) => {
            addRosterButton.addEventListener('click', () => {
                
                if (rosterlistCounter < 7) {

                    roster.push(players[index]);
                    renderRosterList();
    
    
                    players.splice(index, 1);
                    renderPlayerList();

                    rosterlistCounter++;
                }
                else {
                    alert("Roster Full")
                }

                
            });
        });
}

function renderRosterList() {
    let rosterListHTML = '';

    roster.forEach((player, index) => {
        const { name, goals } = player;
        const html = `
            <div>${name}</div>
            <div>${goals}</div>
            <button class="remove-roster-button js-remove-roster-button">-</button>
        `;
        rosterListHTML += html;
    });

    document.querySelector('.js-roster-list')
        .innerHTML = rosterListHTML;
    document.querySelectorAll('.js-remove-roster-button')
        .forEach((removeRosterButton, index) => {
            removeRosterButton.addEventListener('click', () => {

                players.push(roster[index]);              
                renderPlayerList();

                roster.splice(index, 1);
                renderRosterList();

                rosterlistCounter--;
            })
        })
}

//note
fetchPlayers().then(players => {
    if (players) {
        console.log('Players to render :', players);

        renderPlayerList();
    }
});



