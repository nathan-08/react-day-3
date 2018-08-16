import React, { Component } from 'react';
import './App.css';
import Product from './Components/Product';
import CartItem from './Components/CartItem';
import AddProduct from './Components/AddProduct';
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
          image:'http://via.placeholder.com/350x150'
        },
        {
          id:2,
          name:'Tent',
          description:'TENTS',
          price:6.99,
          image:'http://via.placeholder.com/350x150'
        },
      ],
        camping:[
          {
            id:3,
            name:'Sun tan lotion',
            description:'Gotta look fly guy',
            price:7.99,
            image:'http://via.placeholder.com/350x150'
          },
          {
            id:4,
            name:'Mice',
            description:'Not blind',
            price:8.99,
            image:'http://via.placeholder.com/350x150'
          },

        ],
      candy:[],
      clothing:[],
      shoes:[],
      cart:[],
      toggleCard:false,
      apiKey:''
    }
    this.checkout = this.checkout.bind(this);
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
    this.toggleCardView = this.toggleCardView.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }
  componentDidMount(){
    axios.get('/api/key').then( response => {
      console.log('key response:', response)
      this.setState({
        apiKey:response.data.apiKey
      })
      axios.get(`/api/products?key=${this.state.apiKey}`).then( response => {
        console.log('products response: ', response)
        this.setState({
          camping:response.data.filter( product => product.category === 'camping'),
          clothing:response.data.filter( product => product.category === 'clothing'),
          shoes:response.data.filter( product => product.category === 'shoes'),
          candy:response.data.filter( product => product.category === 'candy')
        })
      })
    })
  }
  addProduct( product ){
    console.log('product to add:', product)
    axios.post(`/api/products?key=${this.state.apiKey}`, product).then( response => {
      console.log(response)
      this.setState({
        [product.category]:response.data.filter( serverProduct => serverProduct.category === product.category)
      })
    })
  }
  handleAddItemToCart( item ){
    let newCart = this.state.cart.map( cartItem => {
      return {
        id:cartItem.id,
        name:cartItem.name,
        description:cartItem.description,
        price:cartItem.price,
        image:cartItem.image
      }
    })
    newCart.push(item)
    this.setState({
      cart:newCart
    })
  }
  checkout(){
    alert("Here's yer stuff")
    this.setState({
      cart:[]
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
        <AddProduct
          addItem={this.handleAddItemToCart}
          addProduct={this.addProduct}
        />
        <div className='products'>
          <h1>PRODUCTS</h1>
          <button onClick={this.toggleCardView}>Toggle View</button>
          {/* <h2>Beach Gear</h2>
          {
            this.state.beachGear.map( item => {
              return(
                <Product
                  item={item}
                  addProduct={this.addProduct}
                  cardView={this.state.toggleCard}
                  key={item.id}
                />
              )
            })
          } */}
          <h2>Camping</h2>
          {
            this.state.camping.map( item => {
              return(
                <Product
                  item={item}
                  addItem={this.handleAddItemToCart}
                  cardView={this.state.toggleCard}
                  key={item.id}
                />
              )
            })
          }
          <h2>Clothing</h2>
          {
            this.state.clothing.map( item => {
              return(
                <Product
                  item={item}
                  addItem={this.handleAddItemToCart}
                  cardView={this.state.toggleCard}
                  key={item.id}
                />
              )
            })
          }
          <h2>Shoes</h2>
          {
            this.state.shoes.map( item => {
              return(
                <Product
                  item={item}
                  addItem={this.handleAddItemToCart}
                  cardView={this.state.toggleCard}
                  key={item.id}
                />
              )
            })
          }
          <h2>Candy</h2>
          {
            this.state.candy.map( item => {
              return(
                <Product
                  item={item}
                  addItem={this.handleAddItemToCart}
                  cardView={this.state.toggleCard}
                  key={item.id}
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
                    key={item.id}
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
//     2. Move full cart experience to the server. Incorporating API to namespace and provide different experience. Also, if user hasn't made cart track quantities insted of adding more items to the list, do this now
//     3. Button component, all buttons on the screen with the exact same component.
//     4. Server side search using query parameters. Seperate API for payments.fileName