# Standard library imports

# Remote library imports
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
#from my_secrets import APP_KEY
import os


APP_KEY = os.environ.get('APP_KEY')


# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://adoptadog_db_user:hDeJPC842BF8Lvpb421Vmi8e8ZUeQPJJ@dpg-crs5la0gph6c738pqam0-a.oregon-postgres.render.com/adoptadog_db??sslmode=verify-full"
app.secret_key = APP_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

#Instantiate bcrypt
bcrypt = Bcrypt(app)

# Instantiate CORS
CORS(app)
