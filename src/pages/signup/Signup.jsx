import { Form } from "../../components/form/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";

export const Signup = () => {

  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fields = [
    {
      name: "username",
      label: "Username: ",
      type: "text",
      placeholder: "Username"
    },
    {
      name: "password",
      label: "Password:",
      type: "password",
      placeholder: "Password"
    },
    {
      name: "confirmPassword",
      label: "Confirm Password:",
      type: "password",
      placeholder: "Confirm Password"
    },
    {
      name: "checkbox",
      label: "I agree to the terms and conditions",
      type: "checkbox"
    }
  ];

  const onSubmit = async (formData) => {
    try {
      // Check if password and confirm password match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");

        // Clear the password and username field for security reasons
        formData.password = "";
        formData.username = "";
        formData.confirmPassword = "";

        // Set a timer to clear the error after 3 seconds
        setTimeout(() => {
          setError(null);
        }, 8000);
        return;
      }

      // Sending request to the server
      const response = await axiosInstance.post("/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // If response is not 200
      if (!response.ok) {
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

      // If response is 200
      const data = response.data;
      // Storing the token in localStorage
      login(data.token);
      // Redirect upon successful login
      navigate("/");

      // Catching the error
    } catch (error) {
      setError("Account creation error");
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
    confirmPassword: ""
  };
  return (
    <div>
      <Form fields={fields} onSubmit={onSubmit} initialState={initialState} title="Create an account" btnTxt="Create" error={error} />
    </div>
  )
}
