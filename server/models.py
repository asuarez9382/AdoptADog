from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!

class Dog(db.Model, SerializerMixin):
    __tablename__ = 'dogs'
    
    #Serializatin as well
    
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
    
    
    def __repr__(self):
        return f'<Dog: ID: {self.id} Name: {self.name} Age: {self.age} Breed: {self.breed}>'
    
class User(db.Model, SerializerMixin):
    __tablename__='users'
    
    serialize_rules = (
        "-dogs.user",
        "-dogs.user_id"
    )
    
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    
    dogs = db.relationship('Dog', back_populates='user', cascade='all')
    
    
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
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))
    note = db.Column(db.String, default='Favorited')
    
    def __repr__(self):
        return f'<Favorite: ID: {self.id} User: {self.user_id} Dog: {self.dog_id} >'