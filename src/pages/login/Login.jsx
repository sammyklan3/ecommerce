import { Form } from "../../components/form/Form";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
      const response = await fetch( /* process.env.REACT_APP_API_ENDPOINT || */ "http://localhost:3000/login", {
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
      console.error('Login error:', error);
      setError('Authentication failed. Please check your credentials.');
      // Clear the password and username field for security reasons
      formData.password = "";
      formData.username = "";
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
        <Toaster position="top-center" reverseOrder={false} />
        {error ? toast.error(error) : null}
        <Form fields={fields} onSubmit={onSubmit} initialState={initialState} title="Login" btnTxt="Sign In" />
      </div>
    </>
  );
};
