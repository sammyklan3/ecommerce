import "./form.css";
import { useState } from "react";
import PropTypes from 'prop-types';

export const Form = ({ fields, onSubmit, initialState, title, btnTxt }) => {

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
        <button type="submit" className="btn-submit" onClick={handleSubmit}>{btnTxt}</button>
      </form>
    </div>
  );
};

Form.defaultProps = {
  initialState: {},
  title: "Default Title",
  btnTxt: "Submit",
};


Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  title: PropTypes.string,
  btnTxt: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string, // Assuming type is a string
      placeholder: PropTypes.string,
    })
  ).isRequired,
};
