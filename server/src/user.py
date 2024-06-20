import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from dbcontext import get_db_connection
import datetime
import jwt

user_api = Blueprint('user_api', __name__)

UPLOAD_FOLDER = 'public/uploads'
SECRET_KEY = 'your_secret_key'  # Bạn có thể thay đổi thành một chuỗi bí mật

@user_api.route('/users', methods=['GET'])
def get_users():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Users")
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(users)

@user_api.route('/users/<int:id>', methods=['GET'])
def get_userById(id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Users Where id= %s", (id,))
    user = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(user)

@user_api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Email and password are required"}), 400

    email = data['email']
    password = data['password']

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Users")
    users = cursor.fetchall()
    cursor.close()
    connection.close()

    for user in users:
        if (email.lower() == user['email'].lower()) and (password == user['password']):
            # Tạo token
            token = jwt.encode({
                'id': user['id'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }, SECRET_KEY, algorithm='HS256')

            return jsonify({
                'token': token,
                'user': {
                    'id': user['id'],
                    'email': user['email'],
                    'avatar': user['avatar'],
                    'phone_number': user['phone_number'],
                    'birthday': user['birthday']
                }
            }), 200
    
    return jsonify({"message": "The user does not exist"}), 401

@user_api.route('/register', methods=['POST'])
def register():
    file = request.files['avatar']
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    image_url = os.path.join(UPLOAD_FOLDER, filename)
    image_url = image_url[7:]
    
    # Kiểm tra dữ liệu đầu vào
    email = request.form['email']
    password = request.form['password']
    phone_number = request.form['phone_number']
    birthday = request.form['birthday']


    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    # Kiểm tra email đã tồn tại
    cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()
    if existing_user:
        cursor.close()
        connection.close()
        return jsonify({"message": "Email already exists"}), 409
    
    # Thêm người dùng mới
    cursor.execute("""
        INSERT INTO Users (email, password, avatar, phone_number, birthday, created_at)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (email, password, image_url, phone_number, birthday, datetime.datetime.now()))

    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "User registered successfully"}), 201

@user_api.route('/edit/<int:id>', methods=['PUT'])
def edit(id):
    # Lấy dữ liệu từ request
    new_avatar = request.json.get('avatar')
    new_phone_number = request.json.get('phone_number')
    new_birthday = request.json.get('birthday') 

    # Kết nối đến cơ sở dữ liệu
    connection = get_db_connection()
    cursor = connection.cursor()
    
    # Kiểm tra xem người dùng tồn tại trong cơ sở dữ liệu hay không
    cursor.execute("SELECT * FROM Users WHERE id = %s", (id,))
    user = cursor.fetchone()
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    # Thực hiện cập nhật thông tin mới cho người dùng
    if new_avatar:
        cursor.execute("UPDATE Users SET avatar = %s WHERE id = %s", (new_avatar, id))
    if new_phone_number:
        cursor.execute("UPDATE Users SET phone_number = %s WHERE id = %s", (new_phone_number, id))
    if new_birthday:
        cursor.execute("UPDATE Users SET birthday = %s WHERE id = %s", (new_birthday, id))
    
    # Lưu các thay đổi vào cơ sở dữ liệu
    connection.commit()
    
    # Đóng kết nối và trả về kết quả
    cursor.close()
    connection.close()
    return jsonify({"message": "User profile updated successfully"}), 200
