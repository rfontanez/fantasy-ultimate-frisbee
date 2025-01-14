from flask import Flask, jsonify, request

from audl.stats.endpoints.playerstats import PlayerStats

import pandas as pd

from flask_cors import CORS

import requests #standard requests library

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests #aliased to avoid conflicts

import os
from dotenv import load_dotenv

# import id_token from google.oauth2




# NOTE: To run the server, make sure the virtual environment is activated by cd into .venv
# then running "source bin/activate"
# then cd out of .venv, then cd into backend folder, and run: "flask --app ultimate run"



load_dotenv()


client_id=os.getenv("GOOGLE_CLIENT_ID")



def fetchPlayerStats():

    response = requests.get('https://www.backend.ufastats.com/web-v1/player-stats?limit=20&page=1&teamID=14') 

    
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

def verify_user(user_credentials):
    try:
        verify_request = google_requests.Request()

        id_info = id_token.verify_oauth2_token(user_credentials, verify_request, client_id)

        return True, jsonify({"message": "User verified", "id_info: ": str(id_info)})

        # return jsonify({"message": "User verified.", "sub": id_info.get("sub")})

    except ValueError as e:
        # Handle errors related to token verification (e.g., invalid token)
        return False, jsonify({"message": "User not verified", "error": str(e)}), 401

    except Exception as e:
        # Catch other unexpected errors
        return False, jsonify({"message": "An unexpected error occurred", "error": str(e)}), 500
    
# def user_exists(user_sub):
#     pass
    
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/')
def home():
    return "Welcome to the Fantasy Ultimate Frisbee API. Visit /players to see player data."

@app.route('/login', methods=["POST"])
def login_user():
    user_data = request.json
    user_credentials = user_data.get("credentials")

    is_verified, verify_response = verify_user(user_credentials)

    if is_verified:
        #next check backend to see if its a new user
        #if not, create a new entry for new user
        


        #here return message from verify_repsonse()
        return verify_response
    
    else: 
        return verify_response



    # return jsonify({"message": "RYAN LOGGED IN", "sub": user_sub})


@app.route('/players')
def get_players():

    players = fetchPlayerStats()

    if 'error' in players:
        return jsonify(players), players.get("status_code", 500)

    # return jsonify(players)
    return jsonify(players) 

if __name__ == '__main__':
    app.run(debug=True)

