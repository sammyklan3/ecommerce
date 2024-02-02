import { Form } from "../../components/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../api/axiosInstance";

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
      // Sending request to the server
      const response = await axiosInstance.post("/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // If response status is not 200
      if (response.status !== 200) {
        setError("Username or password incorrect");

        // Clear the password and username field for security reasons
        formData.password = "";
        formData.username = "";

        // Set a timer to clear the error after 3 seconds
        setTimeout(() => {
          setError(null);
        }, 8000);

        return;
      }

      // If response status is 200
      const data = response.data;
      // Storing the token in localStorage
      login(data.token);
      // Redirect upon successful login
      navigate(-1);

      // Catching the error
    } catch (error) {
      console.error(error);
      setError('Authentication failed. Please check your credentials.');
      // Clear the password and username field for security reasons
      formData.password = "";
      formData.username = "";

      // Set a timer to clear the error after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 8000);

      return;
    }
  };


  const initialState = {
    username: "",
    password: "",
  };

  return (
    <>
      <div>
        <Form fields={fields} onSubmit={onSubmit} initialState={initialState} title="Login" btnTxt="Sign In" error={error} />
        
      </div>
    </>
  );
};
