import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import '../../styles/Register.css'; // Import file CSS

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();
  // const [checkPreview, setCheckPreview] = useState(false);
  // const [currentImageUrl, setCurrentImageUrl] = useState("");
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    // setCurrentImageUrl(URL.createObjectURL(file));
    // setCheckPreview(true);
  };

  const handleButtonClick = () => {
    document.getElementById("outlined-image-file").click();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
    const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);
      formData.append("phone_number", phoneNumber);
      formData.append("birthday", birthday);

      const response = await axios.post('http://127.0.0.1:5000/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);

      // if (response.status === 201 || response.status === 200) {
      //     // Đăng ký thành công, chuyển hướng đến /login
      //     navigate('/login');
      // } else {
      //     // Đăng ký thất bại, hiển thị thông báo lỗi
      //     setError(response.data.message);
      // }
    } catch (error) {
      setError('An error occurred during registration.', error);
      e.preventDefault();
    }
  };

  return (
    <div className="mainContainer">
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <TextField
            id="outlined-email"
            label="Email"
            name="email"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            style={{ width: "150%" }} // Đặt chiều rộng 100% cho TextField
          />
          <label className="errorLabel">{error}</label>
          <br />
          <br />
          <br />
          <TextField
            id="outlined-password"
            label="Password"
            name="password"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            style={{ width: "150%" }} // Đặt chiều rộng 100% cho TextField
          />
          <label className="errorLabel"></label>
          <br />
          <br />
          <br />
          <TextField
            id="outlined-phone-number"
            label="Phone Number"
            name="phone_number"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            value={phoneNumber}
            onChange={(ev) => setPhoneNumber(ev.target.value)}
            style={{ width: "150%" }} // Đặt chiều rộng 100% cho TextField
          />
          <label className="errorLabel"></label>
          <br />
          <br />
          <br />
          <TextField
            id="outlined-birthday"
            label="Birthday"
            name="birthday"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={birthday}
            onChange={(ev) => setBirthday(ev.target.value)}
            style={{ width: "150%" }} // Đặt chiều rộng 100% cho TextField
          />
          <label className="errorLabel"></label>
          <br />
          <br />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
        {/* {checkPreview && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={currentImageUrl}
              alt="Preview"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          </div>
        )} */}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <input
            id="outlined-image-file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <Button variant="outlined" onClick={handleButtonClick}>
            Select Image
          </Button>
          <br /><br /><br />
        </div>
      </div>

      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>

      <h6>You have an account yet</h6>
      <button onClick={() => navigate("/login")}>Register</button>
    </div>
  );
}

export default Register;
