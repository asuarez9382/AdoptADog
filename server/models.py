from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class Dog(db.Model, SerializerMixin):
    __tablename__ = 'dogs'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    breed = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    is_adopted = db.Column(db.Boolean, default=False)
    image = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, default=500)
    
    def __repr__(self):
        return f'<Dog: ID: {self.id} Name: {self.name} Age: {self.age} Breed: {self.breed}'
    
class User(db.Model, SerializerMixin):
    __tablename__='users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    
    def __repr__(self):
        return f'User: ID:{self.id} Username: {self.username} Email: {self.email}'
    