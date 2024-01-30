import { Form } from "../../components/form/Form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

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
        setError("Passwords do not match");
        return;
      }
  
      // Sending request to the server
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // If response is not 200
      if (!response.ok) {
        setError("Username or password incorrect");
  
        // Clear the password and username field for security reasons
        formData.password = "";
        formData.username = "";
        return;
      }
  
      // If response is 200
      const data = await response.json();
      // Storing the token in localStorage
      login(data.token);
      toast.success(data.message);
      // Redirect upon successful login
      navigate("/");
  
      // Catching the error
    } catch (error) {
      console.error('Account Creation error:', error);
      setError("Account creation error");
      // Clear the password and username field for security reasons
      formData.password = "";
      formData.username = "";
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
      <Toaster position="top-center" reverseOrder={false} />
      {error ? toast.error(error) : null}
      <Form fields={fields} onSubmit={onSubmit} initialState={initialState} title="Create an account" btnTxt="Create" />
    </div>
  )
}
