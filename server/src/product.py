import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from dbcontext import get_db_connection
from datetime import datetime

product_api = Blueprint('product_api', __name__)

# Đường dẫn tới thư mục lưu trữ tệp tải lên
UPLOAD_FOLDER = 'public/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def is_valid_date_string(date_string, date_format):
    try:
        # Chuyển đổi chuỗi thành đối tượng datetime
        datetime.strptime(date_string, date_format)
        # Nếu không có lỗi, chuỗi phù hợp với định dạng
        return True
    except ValueError:
        # Nếu có lỗi, chuỗi không phù hợp với định dạng
        return False

@product_api.route('/products', methods=['GET'])
def get_products():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Products")
    products = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(products)

@product_api.route('/products/<int:id>', methods=['GET'])
def get_product_detail(id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Products WHERE id = %s", (id,))
    product = cursor.fetchone()
    cursor.close()
    connection.close()
    if product:
        return jsonify(product)
    else:
        return jsonify({'message': 'Product not found'}), 404

@product_api.route('/products', methods=['POST'])
def add_product():
   
        file = request.files['image']
        filename = secure_filename(file.filename)
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        image_url = os.path.join(UPLOAD_FOLDER, filename)
        image_url = image_url[7:]

        
        name = request.form['name']
        due_date = request.form['due_date']
        price = request.form['price']
        
        connection = get_db_connection()
        cursor = connection.cursor()
        add_product_query = (
            "INSERT INTO Products (name, due_date, price, image) "
            "VALUES (%s, %s, %s, %s)"
        )
        cursor.execute(add_product_query, (name, due_date, price, image_url))
        connection.commit()
        cursor.close()
        connection.close()
        return get_products()


@product_api.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        # Tạo danh sách các cột và giá trị để cập nhật
        columns = []
        values = []
        # Lấy dữ liệu từ request.form hoặc request.files tùy thuộc vào dạng dữ liệu
        updated_product = {}
        updated_product = request.form.to_dict()
        if 'image' in request.files:
            file = request.files['image']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                updated_product['image'] = os.path.join(UPLOAD_FOLDER, filename)
                updated_product['image'] = updated_product['image'][7:]  # Cắt bỏ phần 'public/' ở đầu URL

        if 'due_date' in updated_product:
            if is_valid_date_string(updated_product['due_date'], "%a, %d %b %Y %H:%M:%S %Z"):
                original_date_string = updated_product['due_date']
                # Định dạng của chuỗi ban đầu
                original_format = "%a, %d %b %Y %H:%M:%S %Z"

                # Chuyển đổi chuỗi sang đối tượng datetime
                date_object = datetime.strptime(original_date_string, original_format)

                # Định dạng mới bạn muốn
                new_format = "%Y-%m-%d"

                # Chuyển đổi đối tượng datetime sang chuỗi với định dạng mới
                new_date_string = date_object.strftime(new_format)

                columns.append('due_date = %s')
                values.append(new_date_string)

            else:
                columns.append('due_date = %s')
                values.append(updated_product['due_date'])    

        # Kiểm tra từng trường dữ liệu và thêm vào danh sách nếu có giá trị
        if 'name' in updated_product:
            columns.append('name = %s')
            values.append(updated_product['name'])
        if 'price' in updated_product:
            columns.append('price = %s')
            values.append(updated_product['price'])
        if 'image' in updated_product:
            columns.append('image = %s')
            values.append(updated_product['image']) 

        # Thực hiện cập nhật
        connection = get_db_connection()
        cursor = connection.cursor()
        update_product_query = (
            f"UPDATE Products SET {', '.join(columns)} WHERE id = %s"
        )
        cursor.execute(update_product_query, (*values, id))
        connection.commit()
        cursor.close()
        connection.close()

        return get_products()
    except Exception as e:
        print(f"Error updating product: {e}")
        return jsonify({'error': 'An error occurred while updating the product'}), 500


@product_api.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    delete_product_query = "DELETE FROM Products WHERE id = %s"
    cursor.execute(delete_product_query, (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return get_products()
