from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

#Figure out serialize rules
# Models go here!

class Dog(db.Model, SerializerMixin):
    __tablename__ = 'dogs'
    
    #Serializatin as well
    serialize_rules = (
        '-favorites.dog',  # Exclude deeper nested favorite dog info
        '-favorites.user',  # Exclude deeper nested favorite user info
        '-user.dogs',       # Exclude deeper nested user's dogs info
        '-user.favorites'   # Exclude deeper nested user's favorites info
    )
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    breed = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    is_adopted = db.Column(db.Boolean, default=False)
    image = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, default=500)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    user = db.relationship('User', back_populates='dogs', cascade='all')
    
    favorites = db.relationship('Favorite', back_populates='dog', cascade='all')
    
    appointments = db.relationship('Appointment', back_populates='dog', cascade='all')
    
    def __repr__(self):
        return f'<Dog: ID: {self.id} Name: {self.name} Age: {self.age} Breed: {self.breed}>'
    
class User(db.Model, SerializerMixin):
    __tablename__='users'
    
    serialize_rules = (
        '-dogs.user',       # Exclude deeper nested dog's user info
        '-dogs.favorites',  # Exclude deeper nested dog's favorites info
        '-favorites.user',  # Exclude deeper nested favorite's user info
        '-favorites.dog'    # Exclude deeper nested favorite's dog info
    )
    
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    
    dogs = db.relationship('Dog', back_populates='user', cascade='all')
    
    favorites = db.relationship('Favorite', back_populates='user', cascade='all')
    
    def __repr__(self):
        return f'<User: ID:{self.id} Username: {self.username} Email: {self.email}>'
    
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Cannot access password hash")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
        
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    

class Favorite(db.Model, SerializerMixin):
    __tablename__ = "favorites"
    
    serialize_rules = (
        '-user.favorites',  # Exclude deeper nested user's favorites info
        '-user.dogs',       # Exclude deeper nested user's dogs info
        '-dog.favorites',   # Exclude deeper nested dog's favorites info
        '-dog.user'         # Exclude deeper nested dog's user info
    )
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))
    note = db.Column(db.String)
    
    user = db.relationship('User', back_populates='favorites')
    dog = db.relationship('Dog', back_populates='favorites')
    
    def __repr__(self):
        return f'<Favorite: ID: {self.id} User: {self.user_id} Dog: {self.dog_id} >'
    

class Appointment(db.Model, SerializerMixin):
    __tablename__='appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    type = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)
    
    dog = db.relationship('Dog', back_populates='appointments', cascade='all')
    
    def __repr__(self):
        return f'<Appointment: ID: {self.id} Dog: {self.dog_id} Date: {self.date} Type: {self.type}>'
    
    