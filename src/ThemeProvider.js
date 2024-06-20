import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Tạo một context cho theme
export const ThemeContext = createContext();

// Tạo một component provider cho theme
export const ThemeProvider = ({ children }) => {
  const [user, setUser] = useState();
  let id = 0;
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      id = userData.id;
    }
  } catch (error) {
    // Xử lý nếu có lỗi xảy ra khi parse JSON
  }
  
  useEffect(() => {
    const getUsers = async () => {
      if (id !== 0) 
        try {
            const res = await axios.get(`http://127.0.0.1:5000/users/${id}`)
            setUser(res.data[0])
        } catch (error) {
      }
    }
    getUsers()
  },[id])

  return (
    <ThemeContext.Provider value={{ user, setUser }}>
      {children}
    </ThemeContext.Provider>
  );
};
