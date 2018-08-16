import React from 'react';

function CartItem(props) {
    const { item } = props;
    return (
        <div>
            <h4>{item.name}</h4>
            <div>
                <button onClick={() => props.changeQuantity(item, -1)}>-</button>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => props.changeQuantity(item, 1)}>+</button>
            </div>
            <p>{item.price}</p>
            <button onClick={() => props.removeItem(item.id)}>Remove Item</button>
        </div>
    );

}
export default CartItem;