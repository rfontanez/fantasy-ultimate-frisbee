from flask import request, jsonify
from config import app, db
from models import Player, User

#CRUD API. Create, Read, Update, Delete

@app.route("/users", methods=["GET"])
def get_users():
   users = User.query.all()
   json_users = list(map(lambda x: x.to_json(), users))

   return jsonify({"users": json_users})

@app.route("/create_user", methods=["POST"])
def create_user():
    given_name = request.json.get("givenName")
    family_name = request.json.get("familyName")
    email = request.json.get("email")

    if not given_name or not family_name or not email:
        return (
            jsonify({"message": "You must include a first name, last name, and email."}), 404,
        )
    new_user = User(given_name=given_name, family_name=family_name, email=email)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created"}), 201





@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    user.given_name = data.get("given_name", user.given_name)
    user.family_name = data.get("family_name", user.family_name)
    user.email = data.get("email", user.email)

    db.session.commit() #you can just commit directly here since its already added from the first line at the top of the function

    return jsonify({"message": "User updated."}), 200


#PUT DELETE FUNCTION HERE
@app.route("delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted."}), 200

if __name__ == "__main__": #this just makes sure it doesnt run when we import the file and only when we run the file
    with app.app_context():
        db.create_all() #this creates all of the differrent models we have defined in our database if theyre not already created. basically just constructs the database
    app.run(debug=True)