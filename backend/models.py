from config import db


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    points = db.Column(db.Integer, default=0, nullable=False)
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "points": self.points
        }
    
    
#ADD roster class??


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sub = db.Colmn(db.Integer, p)
    given_name = db.Column(db.String(100), unique=False, nullable=False)
    family_name = db.Column(db.String(100), unique=False, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "givenName": self.given_name,
            "familyName": self.family_name,
            "email": self.email
        }
