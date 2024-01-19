import "./button.css";
import PropTypes from 'prop-types';

export const Button = ({ text, onClick, }) => {

  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

Button.defaultProps = {
  text: "Button",
}
Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};