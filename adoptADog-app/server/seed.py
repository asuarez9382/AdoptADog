#!/usr/bin/env python3

# Standard library imports
import random
from random import randint, choice as rc
import requests
import os


# Remote library imports
from faker import Faker
from faker.providers import BaseProvider

# Local imports
from app import app
from models import db, Dog, User, Favorite, Appointment
#from my_secrets import API_KEY
API_KEY = os.environ.get('API_KEY')


#To help generate random dog names
class DogNameProvider(BaseProvider):
    dog_names = [
        'Max', 'Buddy', 'Charlie', 'Jack', 'Cooper',
        'Rocky', 'Bear', 'Toby', 'Duke', 'Tucker',
        'Jake', 'Cody', 'Bailey', 'Riley', 'Zeus',
        'Bella', 'Lucy', 'Luna', 'Daisy', 'Sadie',
        'Molly', 'Lola', 'Sophie', 'Zoey', 'Stella',
        'Rosie', 'Ruby', 'Chloe', 'Maggie', 'Penny',
        'Mia', 'Gracie', 'Abby', 'Sasha', 'Coco',
        'Oliver', 'Oscar', 'Maximus', 'Milo', 'Leo',
        'Jackson', 'Diesel', 'Gus', 'Sam', 'Henry',
        'Rex', 'George', 'Winston', 'Bruce', 'Louie',
        'Walter', 'Marley', 'Thor', 'Simba', 'Hank',
        'Finn', 'Gunner', 'Beau', 'Bandit', 'Apollo',
        'Chase', 'Chance', 'Ace', 'Rocco', 'Boomer',
        'Hudson', 'Ranger', 'Lincoln', 'Jasper', 'Bentley',
        'Lily', 'Zoe', 'Lilly', 'Minnie', 'Bailey',
        'Emma', 'Ellie', 'Harley', 'Willow', 'Ivy',
        'Nala', 'Sandy', 'Ginger', 'Riley', 'Mocha',
        'Lulu', 'Piper', 'Athena', 'Layla', 'Lady',
        'Cleo', 'Sunny', 'Pepper', 'Dixie', 'Hazel',
        'Dolly', 'Sugar', 'Angel', 'Willow', 'Olive'
    ]

    def dog_name(self):
        return self.random_element(self.dog_names)
    
#To help genereate random temperaments
class DogTemperamentProvider(BaseProvider):
    dog_temperaments = [
        "Affectionate and loyal, always eager to please.",
        "Energetic and playful, loves outdoor activities.",
        "Gentle and calm, great with children and other pets.",
        "Independent and intelligent, may be reserved with strangers.",
        "Alert and protective, makes a great watchdog.",
        "Curious and outgoing, enjoys exploring new environments.",
        "Friendly and sociable, loves meeting new people and dogs.",
        "Devoted and obedient, thrives on routine and structure.",
        "Confident and assertive, needs a strong leader for guidance.",
        "Easygoing and adaptable, adjusts well to different living situations."
    ]

    def dog_temperament(self):
        return self.random_element(self.dog_temperaments)




url = "https://api.thedogapi.com/v1/images/search?limit=30&has_breeds=true&api_key=" + API_KEY

response = requests.get(url)
    
    

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        fake.add_provider(DogNameProvider)
        fake.add_provider(DogTemperamentProvider)
        
        #Getting dog breed and image data from api endpoint
        if response.status_code == 200:
            data = response.json()
            
            dogs = []
            
            for dog in data:
                myDog = {}
                
                breed = dog['breeds'][0]['name']
                image = dog['url']
                
                myDog['breed'] = breed
                myDog['image'] = image
                
                dogs.append(myDog)
                
        # Generate 30 random numbers between 500 and 2000
        dog_prices = [random.randint(50, 200) * 10 for _ in range(30)]
        
        for price, dog in zip(dog_prices, dogs):
            dog['price'] = price

        #Generating 30 random dog names and adding to dog object
        dog_names = [fake.dog_name() for _ in range(30)]

        
        for name, dog in zip(dog_names, dogs):
            dog['name'] = name
        
        #Generating 30 random temperaments and adding to dog object
        dog_temperaments = [fake.dog_temperament() for _ in range(30)]
        
        for temperament, dog in zip(dog_temperaments, dogs):
            dog['temperament'] = temperament

        #Generating 30 random ages between 1 and 6 and adding to dog object
        dog_ages = [random.randint(1, 6) for _ in range(30)]

        for age, dog in zip(dog_ages, dogs):
            dog['age'] = age

        #Starts seeding the database
        print("Clearing db...")
        
        Dog.query.delete()
        User.query.delete()
        Favorite.query.delete()
        Appointment.query.delete()
        
        print("Seeding dogs...")
        
        print("Creating users...")

        # make sure users have unique usernames
        users = []
        usernames = []

        for i in range(10):
            
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(
                username=username,
                email=fake.email()
            )

            user.password_hash = user.username + 'password'

            users.append(user)

        db.session.add_all(users)
        
        newDogs= []
        for dog in dogs:
            newDog = Dog(
                breed=dog['breed'],
                image=dog['image'],
                name=dog['name'],
                description=dog['temperament'],
                age=dog['age'],
                price=dog['price']
            )
            newDogs.append(newDog)
            
        db.session.add_all(newDogs)
        db.session.commit()
            
            
        
        print("Done seeding!")
        
