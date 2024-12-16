from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "example:///myexampledatabse.db" #this shows the server where to find the database. Ive put an example url for now
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False #this tells the app not to track modifications in the database

db = SQLAlchemy(app) #this creates an instance of the database so we can have access to the database we linked above. SQLAlchemy allows us to maniputlate the things in the database unsing python to make it easy for us. It basically takes our python code and turns it onto SQL code. THis is called an ORM; object relational mapping. i think lol
