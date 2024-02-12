import "./orderlist.css";
import PropTypes from 'prop-types';

export const Orderlist = ({ order ,index }) => {
  return (
    <div className="order-list-item">
      <div className="order-list-item-details">
        <h3>Order #1</h3>
        <div className="order-list-item-details-date">
          <h4>{order.date}</h4>
        </div>
      </div>
    </div>
  )
}

Orderlist.propTypes = {
  index: PropTypes.number,
  order: PropTypes.shape({
    date: PropTypes.string.isRequired,
  })
}
