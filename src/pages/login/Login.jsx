import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../api/axiosInstance";
import { Form } from "../../components/form/Form";

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
      console.error(error);
      setError('Authentication failed. Please check your credentials.');
    }
  };

  const initialState = {
    username: "",
    password: "",
  };

  return (
    <>
      <div>
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
