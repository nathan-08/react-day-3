import React from "react";
import propTypes from 'prop-types';
import Text from './Text';
import Button from './Button';

export default function CartItem(props) {
  const { item, removeFromCart } = props;
  return (
    <tr className="products_container clearfix">
      <td>
        <img className="product_img" src={item.image} alt="product"/>
      </td>
      <td>
        <Text text={item.name} isHeader={true}/>
        <span>{(item.price * item.quantity).toFixed(2)}</span> <span> | qty: </span>
        <span>{item.quantity}</span>
        <br />
        <Button handleClick={_ => removeFromCart(item.id)} text="remove"/>
      </td>
      <td />
    </tr>
  );
}

CartItem.propTypes = {
    item: propTypes.shape({
        name: propTypes.string.isRequired,
        price: propTypes.number.isRequired,
        id: propTypes.number.isRequired,
        description: propTypes.string.isRequired,
        quantity: propTypes.number.isRequired,
        image: propTypes.string.isRequired
    }),
    removeFromCart: propTypes.func.isRequired
}
