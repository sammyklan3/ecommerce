import "./form.css";
import { useState } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

export const Form = ({ fields, onSubmit, initialState, title, btnTxt, error, signupLink, loginLink, loading }) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e, fieldName) => {
    setFormState({
      ...formState,
      [fieldName]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className="form-container">
      <form className="dark-form">
        <h3 className="title">{title}</h3>
        <br />
        <hr />
        <br />

        {fields.map((field) => (
          <div key={field.name}>
            {field.type === 'checkbox' ? (
              <div className="checkbox-container" key={field.name}>
                <input
                  type="checkbox"
                  checked={formState[field.name] || false}
                  onChange={(e) => handleChange(e, field.name)}
                />
                <label>{field.label}</label>
              </div>
            ) : (
              <>
                <label>{field.label}</label>
                <input
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  value={formState[field.name] || ""}
                  onChange={(e) => handleChange(e, field.name)}
                />
              </>
            )}
          </div>
        ))}

        <br />
        {loading ? (
          <button type="submit" disabled={loading} className="btn-submit-loading">
          <div className="login-loading-spinner">

          </div>
        </button>
        ) : (
        <button type="submit" className="btn-submit" onClick={handleSubmit}>
          {btnTxt}
        </button>
        )}
        <br />
        {error && (
          <>
            <div className="error-container">
              <p className="error-txt">{error}</p>
            </div>
            <br />
          </>
        )}

        {/* Conditionally render the sign-up link */}
        {signupLink ? (
          <p className="link">Don&apos;t have an account? <NavLink to={signupLink}>Sign Up</NavLink></p>
        ) : loginLink ? (
          <p className="link">Already have an account? <NavLink to={loginLink}>Login</NavLink></p>
        ) : (
          null
        )}
      </form>
    </div>
  );
};

Form.defaultProps = {
  initialState: {},
  title: "Default Title",
  btnTxt: "Submit",
  error: null,
  signupLink: null, // Default to no sign-up link
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  title: PropTypes.string,
  btnTxt: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  signupLink: PropTypes.string, // URL for the sign-up page
  loginLink: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
    })
  ).isRequired,
};
