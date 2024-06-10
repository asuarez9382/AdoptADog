#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
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
        
class DogByID(Resource):
    
    def get(self, id):
        
        dog = Dog.query.filter_by(id=id).first()
        
        if dog:
            
            dog_dict = dog.to_dict()
            
            response = make_response(
                dog_dict,
                200
            )
            
            return response
        
        else:
            return { "error": "Dog not found" }, 404
        
    def patch(self, id):
        
        dog_data = request.get_json()
        
        dog = Dog.query.filter_by(id=id).first()
        
        if dog:
            
            dog.is_adopted = dog_data['is_adopted']
            
            db.session.commit()
    
            dog_dict = dog.to_dict()
    
            response = make_response(
                dog_dict,
                200
            )
            
            return response 
        
        else:
            return { "error": "Dog does not exist" }
    
    
class Users(Resource):
    
    def get(self):
        
        users = User.query.all()
        
        users_list = [ user.to_dict() for user in users ]
        
        response = make_response(
            users_list,
            200
        )
        
        return response
    
    def post(self):
        
        user_data = request.get_json()
        
        errors = []
        
        if User.query.filter_by(username = user_data['username']).first():
            error = "Username already exists in database"
            errors.append(error) 
        
        if User.query.filter_by(email = user_data['email']).first():
            error = "Email already exists in database"
            errors.append(error)
            
        if errors:
            response = make_response(jsonify(
                errors, 
                400
            ))
            return response
        
        try:
            
            newUser = User(
                username=user_data['username'],
                email=user_data['email']
            )
            
            newUser.password_hash = user_data['password']
            
            db.session.add(newUser)
            db.session.commit()
            
            session['user_id'] = newUser.id
            
            newUser_dict = newUser.to_dict()
            
            response = make_response(
                newUser_dict,
                201
            )
            
            return response 
    
        except:
            return { "errors": ["validation errors"] }, 400
        
        
class UserByID(Resource):
    
    def get(self, id):
        
        user = User.query.filter_by(id = id).first()
        
        if user:
            user_dict = user.to_dict()
            
            response = make_response(
                user_dict,
                200
            )
            
            return response 
            
        else:
            return { "error": "User does not exist" }, 404
        
                
        
class Login(Resource):
    
    def post(self):
        
        user_data = request.get_json()
        
        username = user_data['username']
        password = user_data['password']
        
        user = User.query.filter_by(username = username).first()
        
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            return { 'error': '401 Unauthorized' }, 401
        else:
            return { 'error': '401 Unauthorized' }, 401
    

class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        return { 'error': '401 Unauthorized' }, 401
    
class CheckSession(Resource):
    
    def get(self):
        user = User.query.filter(User.id == session['user_id']).first()
        
        if user:
            return user.to_dict(), 200
        else:
            return { 'error': '401 Unauthorized' }, 401

api.add_resource(Dogs, "/dogs")
api.add_resource(DogByID, "/dogs/<int:id>")
api.add_resource(Users, "/users")
api.add_resource(UserByID, "/users/<int:id>")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(CheckSession, "/check_session")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

