import psycopg2

try:
    conn = psycopg2.connect("postgresql+psycopg2://myuser:mypassword@dpg-crs5la0gph6c738pqam0-a.oregon-postgres.render.com:5432/mydatabase?sslmode=require")
    print("Connection successful!")
except Exception as e:
    print("Error:", e)
