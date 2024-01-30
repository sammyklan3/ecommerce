import "./form.css";
import { useState } from "react";
import PropTypes from 'prop-types';

export const Form = ({ fields, onSubmit, initialState, title, btnTxt, error }) => {
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

        {/* Display error message if present */}


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
        <button type="submit" className="btn-submit" onClick={handleSubmit}>
          {btnTxt}
        </button>
        <br />
        {error ? (
          <div className="error-container">
            <p className="error-txt">{error}</p>
          </div>
        ) : null}
      </form>


    </div>
  );
};

Form.defaultProps = {
  initialState: {},
  title: "Default Title",
  btnTxt: "Submit",
  error: null, // Default to no error
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  title: PropTypes.string,
  btnTxt: PropTypes.string,
  error: PropTypes.string, // Error message to be displayed
  message: PropTypes.string, // Message to be displayed
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string, // Assuming type is a string
      placeholder: PropTypes.string,
    })
  ).isRequired,
};
