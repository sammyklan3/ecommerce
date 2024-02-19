import "./signup.css";
import { Form } from "../../components/form/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { axiosInstance } from "../../api/axiosInstance";

export const Signup = () => {

  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = async (formData) => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        // Clear form fields
        formData.password = "";
        formData.confirmPassword = "";
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }

      setLoading(true);

      const response = await axiosInstance.post("/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.status !== 200) {
        setLoading(false);
        throw new Error("An error occurred");
      }

      setLoading(false);
      const data = response.data;
      login(data.token);
      navigate("/");

    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      // Clear form fields
      formData.password = "";
      formData.confirmPassword = "";
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };


  const initialState = {
    username: "",
    password: "",
    confirmPassword: ""
  };
  return (
    <div className="signup-container">
      {/* Back button */}
      <p className="arrow-back" onClick={handleBack}><FaArrowLeft /><p>Back</p></p>
      <Form fields={fields} onSubmit={onSubmit} initialState={initialState} title="Create an account" btnTxt="Create" error={error} loginLink="/login" loading = {loading}/>
    </div>
  )
}
