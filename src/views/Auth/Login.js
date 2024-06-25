import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';
import { ThemeContext } from '../../ThemeProvider'; // Import ThemeContext

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(ThemeContext); // Lấy setUser từ context

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Lấy token từ phản hồi
                const token = data.token;

                // Lưu token và thời gian hết hạn vào localStorage
                const expiresIn = 3600; // Thời gian hết hạn tính bằng giây
                const now = new Date();
                const expirationTime = now.getTime() + expiresIn * 1000;

                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpiration', expirationTime.toString());

                // Cập nhật context người dùng và lưu thông tin người dùng vào localStorage
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Chuyển hướng đến trang /default
                navigate('/product');
            } else {
                // Đăng nhập thất bại, hiển thị thông báo lỗi
                setError(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login.');
        }
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Điều hướng đến component Register
    };

    return (
        <div className="login-container">
            <div className="mainContainer">
                <div className="titleContainer">
                    <div>Login</div>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{error}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{ }</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input className="inputButton" type="button" value="Log in" onClick={handleLogin} />
                </div>
                <h6>You don't have an account yet</h6>
                <button onClick={handleRegisterClick} style={{ marginRight: '10px'}}>Register</button>
            </div>
        </div>
    );
}

export default Login;
