from config import db

#this file takes the database that config built and connected to and builds the tables of the database. Each class represents a table in the database

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    points = db.Column(db.Integer, default=0, nullable=False)
    
    # this converts the object to JSON so it can be sent to the frontend.

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "points": self.points
        }
    
    
#ADD roster class??


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sub = db.Column(db.String(100), unique=True, nullable=False)
    given_name = db.Column(db.String(100), nullable=False)
    family_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    count = db.Column(db.Integer, default=0) #this is for testing

    def to_json(self):
        return {
            "id": self.id,
            "givenName": self.given_name,
            "familyName": self.family_name,
            "email": self.email,
            "count": self.count #this is for testing
        }
