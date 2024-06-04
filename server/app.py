#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Dog, User


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Dogs(Resource):
    
    def get(self):
        dogs = Dog.query.all()
        
        dogs_list = [ dog.to_dict() for dog in dogs ]
        
        response = make_response(
            dogs_list,
            200
        )
        
        return response
    
    def post(self):
        
        dog_data = request.get_json()
        
        try:
            
            newDog = Dog(
                breed=dog_data['breed'],
                image=dog_data['image'],
                name=dog_data['name'],
                description=dog_data['description'],
                age=dog_data['age'],
                price=dog_data['price']
            )
            
            db.session.add(newDog)
            db.session.commit()
            
            newdog_dict = newDog.to_dict()
            
            response = make_response(
                newdog_dict,
                201
            )
            
            return response 
    
        except:
            return { "errors": ["validation errors"] }, 400
        
    
class Users(Resource):
    
    def get(self):
        
        users = User.query.all()
        
        users_list = [ user.to_dict() for user in users ]
        
        response = make_response(
            users_list,
            200
        )
        
        return response
    
    

api.add_resource(Dogs, "/dogs")
api.add_resource(Users, "/users")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

