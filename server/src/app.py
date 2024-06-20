from flask import Flask
from product import product_api
from user import user_api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Đăng ký Blueprint product_api với ứng dụng Flask chính
app.register_blueprint(product_api)
app.register_blueprint(user_api)

if __name__ == '__main__':
    app.run(debug=True)
