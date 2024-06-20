#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
from dateutil import parser
from datetime import datetime

# Local imports
from config import app, db, api
# Add your model imports
from models import Dog, User, Favorite, Appointment


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
            dog.user_id = dog_data['user_id']
            
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
                user_data = user.to_dict()
                user_data['dogs'] = [dog.to_dict() for dog in user.dogs]
                return user_data, 200
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
        
class Favorites(Resource):
    
    def get(self):
        favorites = Favorite.query.all()
        
        favorites_dict = [ favorite.to_dict() for favorite in favorites ]
        
        response = make_response(
            favorites_dict,
            200
        )
        
        return response
    
    def post(self):
        favorite_data = request.get_json()
        
        try:
            new_favorite = Favorite(
                user_id = favorite_data['user_id'],
                dog_id = favorite_data['dog_id']
            )
            
            db.session.add(new_favorite)
            db.session.commit()
            
            new_favorite_dict = new_favorite.to_dict()
            
            response = make_response(
                new_favorite_dict,
                201
            )
            
            return response
        
        except:
            return { "errors": "Unable to create favorite" }, 400
        
        
# Add a patch method to favoriteByID
    
class FavoriteByID(Resource):
    
    def get(self,id):
        favorite = Favorite.query.filter_by(id=id).first()
        
        if favorite:
            favorite_dict = favorite.to_dict()
            
            response = make_response(
                favorite_dict,
                200
            )
            
            return response
        
        else:
            return { "error": "Favorite item does not exist" }, 404
                
        
    def delete(self, id):
        favorite = Favorite.query.filter_by(id=id).first()
        
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
            
            return {}, 204
        
        else:
            return {"error": "Favorite item not found"}, 404
        
    def patch(self, id):
        
        favorite_data = request.get_json()
        
        favorite = Favorite.query.filter_by(id = id).first()
        
        if favorite:
        
            favorite.note = favorite_data['note']
            
            db.session.commit()
            
            favorite_dict = favorite.to_dict()
            
            response = make_response(
                favorite_data,
                200
            )
            
            return response
        
        else:
            return { "error": "Favorite with ID does not exist" }, 404
            
class Appointments(Resource):
    
    def get(self):
        
        appointments = Appointment.query.all()
        
        appointments_dict = [ appointment.to_dict() for appointment in appointments ]
        
        response = make_response(
            appointments_dict,
            200
        )
        
        return response
    
    def post(self):
        appointment_data = request.get_json()
        
        try:
            
            date = parser.parse(appointment_data['date'])
            
            new_appointment = Appointment(
                dog_id=appointment_data['dog_id'],
                date=date,
                type=appointment_data['type'],
                notes=appointment_data['notes']
            )
            
            db.session.add(new_appointment)
            db.session.commit()
            
            new_appointment_dict = new_appointment.to_dict()
            
            response = make_response(
                new_appointment_dict,
                201
            )
            
            return response
            
        except:
            return { "error": "Unable to create appointment" }, 400
    
class  AppointmentsByID(Resource):
    
    def get(self,id):
        
        appointment = Appointment.query.filter_by(id=id).first()
        
        if appointment:
            
            appointment_dict = appointment.to_dict()
            
            response = make_response(
                appointment_dict,
                200
            )
            
            return response
        else:
            return { "error": "Appointment not found" }, 404
        
    def delete(self, id):
        
        appointment = Appointment.query.filter_by(id=id).first()
        
        if appointment:
            
            db.session.delete(appointment)
            db.session.commit()
            return {}, 204
        else:
            return { "error": "Appointment does not exist" }, 404

api.add_resource(Dogs, "/dogs")
api.add_resource(DogByID, "/dogs/<int:id>")
api.add_resource(Users, "/users")
api.add_resource(UserByID, "/users/<int:id>")
api.add_resource(Favorites, "/favorites")
api.add_resource(FavoriteByID, "/favorites/<int:id>")
api.add_resource(Appointments, "/appointments")
api.add_resource(AppointmentsByID, "/appointments/<int:id>")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(CheckSession, "/check_session")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

