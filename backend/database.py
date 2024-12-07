# import mysql.connector
# from mysql.connector import pooling

# # Database configuration
# db_config = {
#     'user': 'your_user',
#     'password': 'your_password',
#     'host': 'localhost',
#     'database': 'DogBarkSounds',
#     'pool_name': 'mypool',
#     'pool_size': 5
# }

# # Initialize connection pool
# connection_pool = mysql.connector.pooling.MySQLConnectionPool(**db_config)

# def get_db_connection():
#     return connection_pool.get_connection()

# def fetch_data_from_db():
#     conn = get_db_connection()
#     cursor = conn.cursor()
    
#     query = """
#     SELECT s.file_path, l.name 
#     FROM Sounds s
#     JOIN Labels l ON s.label_id = l.id
#     """
#     cursor.execute(query)
#     data = cursor.fetchall()
    
#     cursor.close()
#     conn.close()
    
#     return data

# def add_sound(file_path, label):
#     conn = get_db_connection()
#     cursor = conn.cursor()
    
#     cursor.execute("SELECT id FROM Labels WHERE name = %s", (label,))
#     result = cursor.fetchone()
#     if result:
#         label_id = result[0]
#     else:
#         cursor.execute("INSERT INTO Labels (name) VALUES (%s)", (label,))
#         label_id = cursor.lastrowid
    
#     cursor.execute("INSERT INTO Sounds (file_path, label_id) VALUES (%s, %s)", (file_path, label_id))
    
#     conn.commit()
#     cursor.close()
#     conn.close()
