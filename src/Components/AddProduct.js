import React, { Component } from 'react';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput:'',
            descriptionInput:'',
            priceInput:'',
            imageInput:'',
            categoryInput:'camping'
        }
    }
    handleName( name ){
        this.setState({
            nameInput:name
        })
    }
    handleDescription( description ){
        this.setState({
            descriptionInput:description
        })
    }
    handlePrice( price ){
        this.setState({
            priceInput:price
        })
    }
    handleImage( image ){
        this.setState({
            imageInput:image
        })
    }
    handleCategory( category ){
        this.setState({
            categoryInput:category
        })
    }
    
    render() {
        const { nameInput, descriptionInput, priceInput, imageInput, categoryInput } = this.state;
        return (
            <div>
                <h2>Add Product</h2>
                <p>Name: </p>
                <input onChange={e => this.handleName(e.target.value)} value={nameInput}/>
                <p>Description: </p>
                <input onChange={e => this.handleDescription(e.target.value)} value={descriptionInput}/>
                <p>Price: </p>
                <input onChange={e => this.handlePrice(e.target.value)} value={priceInput}/>
                <p>Image: </p>
                <input onChange={e => this.handleImage(e.target.value)} value={imageInput}/>
                <p>Category: </p>
                <select onChange={e => this.handleCategory(e.target.value)} value={categoryInput} >
                    <option value="camping">Camping</option>
                    <option value="candy">Candy</option>
                    <option value="clothing">Clothing</option>
                    <option value="shoes">Shoes</option>
                </select>
                <button onClick={() => this.props.addProduct({name:nameInput, description:descriptionInput, price:priceInput, image:imageInput, category:categoryInput})}>Submit</button>
            </div>
        );
    }
}

export default AddProduct;