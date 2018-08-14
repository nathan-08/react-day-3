import React from 'react';

function CartItem(props) {
    const { item } = props;
    return (
        <div>
            <h4>{item.name}</h4>
            <p>{item.price}</p>
        </div>
    );

}
export default CartItem;