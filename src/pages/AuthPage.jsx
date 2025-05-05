import React from "react";
import RegisterForm from "../components/RegisterForm";
// import RegisterForm from "../components/RegisterForm"; // ✅ Adjust path if needed

const AuthPage = () => {
  const handleRegisterSuccess = () => {
    console.log("User registered successfully!");
    // Optional: Redirect to login or homepage
  };

  const showAlert = (message, type) => {
    alert(`${type.toUpperCase()}: ${message}`);
  };

  return (
    <div>
      <RegisterForm
        onRegisterSuccess={handleRegisterSuccess}
        showAlert={showAlert}
      />
    </div>
  );
};

export default AuthPage;
