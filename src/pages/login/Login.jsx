import { Form } from "../../components/form/Form";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';


export const Login = () => {

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
    }
  ];

  const onSubmit = async (FormData) => {
    // Custom submit logic
    try {
      // Sending form data to API endpoint
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(FormData)
      });

      if (!response.ok) {
        // Handle authentication error
        setError("Username or password incorrect")
      }

      // Parse the JSON data in the response body
      const data = await response.json();

      setMessage(data.message)

    } catch (error) {
      // Use the caught error instead of the undefined 'error' variable
      console.error('Login error:', error);
      setError('Authentication failed. Please check your credentials.');
    }
  };

  const initialState = {
    username: "",
    password: ""
  };


  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    <div>

      {error ? toast.success(message) : toast.error(error)}
      < Form fields={fields} onSubmit={onSubmit} initialState={initialState} title="Login" btnTxt="Sign In" />
    </div>
    </>
  )
}
