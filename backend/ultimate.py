from flask import Flask, jsonify

from audl.stats.endpoints.playerstats import PlayerStats

import pandas as pd

from flask_cors import CORS

import requests



# NOTE: To run the server, make sure the virtual environment is activated by cd into .venv
# then running "source bin/activate"
# then cd out of .venv, then cd into backend folder, and run: "flask --app ultimate run"

app = Flask(__name__)
CORS(app)




def fetchPlayerStats():

    response = requests.get('https://www.backend.ufastats.com/web-v1/player-stats?limit=20&page=3&teamID=5') 

    
    #this is just a link a pulled directly from the UFA website. As of 12/10/24 the audl API isn't working
    #i think this is due to the audl switching to UFA and their website links changing
    #At this point I should just make my own API to get stats and not go through someone else's
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to fetch player stats"}, response.status_code
    

    # try:
    #     print("hello RYAN")
    #     players_df = PlayerStats('2022', 'total', 'breeze').fetch_table()  # PlayerStats(season, per, team) this returns a dataFrame
    # # Convert the DataFrame to a JSON string
    #     players_json = players_df.to_dict(orient='records')

    # # Convert JSON string to a Python dictionary
    # # players_data = pd.read_json(players_json, orient='records').to_dict(orient='records')

    #     return players_json
    # except:
    #     request = requests.get('https://www.backend.ufastats.com/web-v1/player-stats?limit=20&teamID=5')
    #     return request


@app.route('/')
def home():
    return "Welcome to the Fantasy Ultimate Frisbee API. Visit /players to see player data."


@app.route('/players')
def get_players():

    players = fetchPlayerStats()

    if 'error' in players:
        return jsonify(players), players.get("status_code", 500)

    # return jsonify(players)
    return jsonify(players) 

if __name__ == '__main__':
    app.run(debug=True)

