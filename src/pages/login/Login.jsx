import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../api/axiosInstance";
import { Form } from "../../components/form/Form";
import { FaArrowLeft } from "react-icons/fa";

export const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fields = [
    {
      name: "username",
      label: "Username: ",
      type: "text",
      placeholder: "Username",
    },
    {
      name: "password",
      label: "Password:",
      type: "password",
      placeholder: "Password",
    },
  ];

// Function to handle back navigation
const handleBack = () => {
    navigate(-1);
};

  const onSubmit = async (formData) => {
    try {
      const response = await axiosInstance.post("/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        setError("Username or password incorrect");
      } else {
        const data = response.data;
        login(data.token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const initialState = {
    username: "",
    password: "",
  };

  return (
    <>
      <div className="login-container">
        {/* Back button */}
        <p className="arrow-back" onClick={handleBack}><FaArrowLeft /><p>Back</p></p>
        <Form
          fields={fields}
          onSubmit={onSubmit}
          initialState={initialState}
          title="Login"
          btnTxt="Sign In"
          error={error}
          signupLink="/signup" // Pass the signup link to the Form component
        />
      </div>
    </>
  );
};
