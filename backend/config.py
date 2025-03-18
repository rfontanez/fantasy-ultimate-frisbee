from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_migrate import Migrate


# this sets up the connection to the mysql server and signs into the specific database user for the app using .env file. Then models.py sets up the database.

app = Flask(__name__)
CORS(app)


load_dotenv()

db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")
db_host = os.getenv("DB_HOST")


#app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+mysqlconnector://{db_user}:{db_password}@{db_host}/{db_name}" #this shows the server where to find the database. Ive put an example url for now
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql://{db_user}:{db_password}@{db_host}/{db_name}"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False #this tells the app not to track modifications in the database

# db = SQLAlchemy()
# db.init_app(app)
db = SQLAlchemy(app) #this creates an instance of the database so we can have access to the database we linked above. SQLAlchemy allows us to maniputlate the things in the database unsing python to make it easy for us. It basically takes our python code and turns it onto SQL code. THis is called an ORM; object relational mapping. i think lol
migrate = Migrate(app, db)
