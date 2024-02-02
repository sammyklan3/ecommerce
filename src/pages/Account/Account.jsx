import "./account.css"
import { Navbar } from "../../components/navbar/Navbar"
import { useAuth } from "../../context/AuthContext"
import { NavLink } from "react-router-dom"

export const Account = () => {
  const { token, logout, currentUsername } = useAuth();

  return (
    <div>
      <Navbar />
      {token ? (
        <>
          <p>{currentUsername}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <div className="modal-content">
          <h3>Please Sign In</h3>
          <NavLink to="/login" className="modal-link">Login</NavLink>
        </div>
      )}
    </div>
  )
}
