from flask import Flask, jsonify

from audl.stats.endpoints.playerstats import PlayerStats

import pandas as pd

from flask_cors import CORS


# NOTE: To run the server, make sure the virtual environment is activated by cd into .venv
# then running "source bin/activate"
# then cd out of .venv, into ultimate folder, and run: "flask --app ultimate run"

app = Flask(__name__)
CORS(app)



def fetchPlayerStats():
    players_df = PlayerStats('2022', 'total', 'breeze').fetch_table()  # PlayerStats(season, per, team) this returns a dataFrame
    # Convert the DataFrame to a JSON string
    players_json = players_df.to_dict(orient='records')

    # Convert JSON string to a Python dictionary
    # players_data = pd.read_json(players_json, orient='records').to_dict(orient='records')

    return players_json


@app.route('/')
def home():
    return "Welcome to the Fantasy Ultimate Frisbee API. Visit /players to see player data."


@app.route('/players')
def get_players():

    players = fetchPlayerStats()
    return jsonify(players)

if __name__ == '__main__':
    app.run(debug=True)


