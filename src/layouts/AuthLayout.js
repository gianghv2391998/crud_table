import React from 'react';
import '../styles/AuthLayout.css'

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth-background">
      <div className="auth-content">
        {children}
      </div>
    </div>
  );
};
