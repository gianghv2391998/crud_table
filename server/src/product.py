from flask import jsonify, request
from flask import Blueprint
from dbcontext import get_db_connection
from datetime import datetime

# Tạo một Blueprint để quản lý API của sản phẩm
product_api = Blueprint('product_api', __name__)

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
    new_product = request.get_json()
    name = new_product['name']
    due_date = new_product['due_date']
    price = new_product['price']
    image = new_product['image']
    connection = get_db_connection()
    cursor = connection.cursor()
    add_product_query = (
        "INSERT INTO Products (name, due_date, price, image) "
        "VALUES (%s, %s, %s, %s)"
    )
    cursor.execute(add_product_query, (name, due_date, price, image))
    connection.commit()
    cursor.close()
    connection.close()
    return get_products()

@product_api.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        updated_product = request.get_json()
        name = updated_product.get('name')
        due_date = updated_product.get('due_date')
        price = updated_product.get('price')
        image = updated_product.get('image')

        # Chuyển đổi định dạng của due_date nếu nó được cung cấp
        if due_date:
            due_date = datetime.strptime(due_date, "%a, %d %b %Y %H:%M:%S %Z").strftime("%Y-%m-%d")

        if not all([name, due_date, price, image]):
            return jsonify({'error': 'Invalid input data'}), 400

        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            update_product_query = (
                "UPDATE Products "
                "SET name = %s, due_date = %s, price = %s, image = %s "
                "WHERE id = %s"
            )
            cursor.execute(update_product_query, (name, due_date, price, image, id))
            connection.commit()
            cursor.close()
            connection.close()
            return get_products()
        except Exception as e:
            print(f"Error executing SQL query: {e}")
            return jsonify({'error': 'An error occurred while updating the product'}), 500

    except Exception as e:
        print(f"Error in request processing: {e}")
        return jsonify({'error': 'Invalid request data'}), 400


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
