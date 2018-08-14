import React, { Component } from 'react';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput:'',
            descriptionInput:'',
            priceInput:'',
            imageInput:''
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
    
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default AddProduct;