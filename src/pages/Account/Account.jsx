import "./account.css";
import { useState, useEffect } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";

export const Account = () => {
  const { userDetails, token, logout } = useAuth();
  const [data, setData] = useState([]);

  console.log(userDetails);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/profile/${userDetails.userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {token ? (
        <div className="account-container">
          <div className="account-details">
            <img src={data.profile_image || "https://via.placeholder.com/400"} alt="profile" />
            <div className="account-info">
              <p>{userDetails.username}</p>
              <small>UserID: {userDetails.userId}</small>

            </div>
          </div>

          <div className="account-content">
            <ul>
              <li><p>Name: </p> <p>{userDetails.username}</p></li>
              <li><p>Email: </p> <p>sammyklane@gmail.com</p></li>
              <li><p>Phone: </p> <p>+254 712 865 645 </p></li>
              <li><p>Gender: </p> <p>Male</p></li>
              <li><p>Date of Birth: </p> <p>28/05/2003</p></li>
              <li><p>Address: </p> <p>Kiembeni, Mombasa</p></li>
            </ul>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="modal-content">
          <h3>Please Sign In</h3>
          <NavLink to="/login" className="modal-link">Login</NavLink>
        </div>
      )}
    </div>
  )
}
