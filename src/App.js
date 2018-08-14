import React, { Component } from 'react';
import './App.css';
import Product from './Components/Product';
import CartItem from './Components/CartItem';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beachGear:[
        {
          id:1,
          name:'Flip Flops',
          description:'Some flippy floppys',
          price:5.99,
          imageUrl:'http://via.placeholder.com/350x150'
        },
        {
          id:2,
          name:'Tent',
          description:'TENTS',
          price:6.99,
          imageUrl:'http://via.placeholder.com/350x150'
        },
      ],
        camping:[
          {
            id:3,
            name:'Sun tan lotion',
            description:'Gotta look fly guy',
            price:7.99,
            imageUrl:'http://via.placeholder.com/350x150'
          },
          {
            id:4,
            name:'Mice',
            description:'Not blind',
            price:8.99,
            imageUrl:'http://via.placeholder.com/350x150'
          },

        ],
      
      cart:[],
      toggleCard:false
    }
    this.checkout = this.checkout.bind(this);
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
    this.toggleCardView = this.toggleCardView.bind(this);
  }
  componentDidMount(){
    axios.get('/insertApiHereForGettingProducts').then( response => {
      this.setState({
        //set state with the products from the server
      })
    })
  }
  addProduct( product ){
    axios.post('/insertApiForAddingProductToServer', product).then( response => {
      this.setState({
        //should receive updated array with new list of products, update on state
      })
    })
  }

  handleAddItemToCart( item ){
    // let newCart = this.state.cart.map( cartItem => {
    //   return {
    //     id:cartItem.id,
    //     name:cartItem.name,
    //     description:cartItem.description,
    //     price:cartItem.price,
    //     imageUrl:cartItem.imageUrl
    //   }
    // })
    // newCart.push(item)
    // this.setState({
    //   cart:newCart
    // })
    axios.post('/apiToAddItemToCart', item).then( response => {
      this.setState({
        //set the cart with the response from the server, which should be an updated cart
      })
    })
  }
  handleRemoveItemFromCart( id ){
    axios.delete(`/apiToRemoveItemFromCart/${id}`).then( response => {
      this.setState({
        //set the cart with the response from the server, which should be an updated cart
      })
    })
  }
  checkout(){
    alert("Here's yer stuff")
    // this.setState({
    //   cart:[]
    // })
    axios.delete(`/apiToCheckoutCart`).then( response => {
      this.setState({
        cart:[] //or set it to response from server, which I assumed would be an empty array representing the cart
      })
    })
  }
  toggleCardView(){
    this.setState({
      toggleCard:!this.state.toggleCard
    })
  }
  render() {
    return (
      <div>
        
        <div className='products'>
          <h1>PRODUCTS</h1>
          <button onClick={this.toggleCardView}>Toggle View</button>
          <h2>Beach Gear</h2>
          {
            this.state.beachGear.map( item => {
              return(
                <Product
                  item={item}
                  addItem={this.handleAddItemToCart}
                  cardView={this.state.toggleCard}
                />
              )
            })
          }
          <h2>Camping</h2>
          {
            this.state.camping.map( item => {
              return(
                <Product
                  item={item}
                  addItem={this.handleAddItemToCart}
                  cardView={this.state.toggleCard}
                />
              )
            })
          }
          
        </div>
        <div className='side_bar'>
          <div className='cart'>
            <h1>CART</h1>
            {
              this.state.cart.map( item => {
                return( 
                  <CartItem
                    item={item}
                  />
                )
              })
            }

          </div>
          <div className='total'>
            <h1>TOTAL</h1>
            <p>${
              this.state.cart.reduce( ( accumulator, current ) => accumulator+= current.price,0)
            }</p>
            <button onClick={this.checkout}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// Day 3
//     HTTP and axios
//     Lifecycle methods and rest
//     1. list of products from the server, also add a new product to the server. GET, POST
//     Look into swagger.io for the api key
//     2. Move full cart experience to the server. Incorporating API to namespace and provide different experience 
//     3. Button component, all buttons on the screen with the exact same component.
//     4. Server side search using query parameters. Seperate API for payments.fileName
