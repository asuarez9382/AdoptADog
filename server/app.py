#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Dog


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
    
api.add_resource(Dogs, "/dogs")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

