import React, { Component } from "react";
import PropTypes from "prop-types";
import "./../App.css";
import Text from "./Text";
import Button from './Button';

class Product extends Component {
  render() {
    const { item, cardView } = this.props;
    return cardView ? (
      <div>
        
        <Text 
            text={item.name} 
            isHeader={true}
        />
        <Text
            text={'$' + item.price}
            isHeader={false}
        />
        {/* <button onClick={() => this.props.addItem(item)}>Add to Cart</button> */}
        <Button handleClick={() => this.props.addItem(item)} text='Add to Cart'/>
        
      </div>
    ) : (
      <div>
        <img src={item.image} alt="the item" />
        <Text
            text={item.name}
            isHeader={true}
        />
        <Text
            text={item.description}
            isHeader={false}
        />
        <Text
            text={'$' + item.price}
            isHeader={false}
        />
        {/* <button onClick={() => this.props.addItem(item)}>Add to Cart</button> */}
        <Button handleClick={() => this.props.addItem(item)} text='Add to Cart'/>
      </div>
    );
  }
}
Product.propTypes = {
  item: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired,
  cardView: PropTypes.bool
};
export default Product;