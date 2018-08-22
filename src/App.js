import React, { Component } from "react";
import axios from 'axios';
import "./App.css";
import Product from './Components/Product';
import CartItem from './Components/CartItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressInput: "",
      ccInput: "",
      display: "products",
      cart: [],
      apiKey: '',
      searchInput: '',
      cardView: true,
      products: [],
      beachGear: [
        {
          id: 1,
          name: "Flip Flops",
          description: "Some flippy floppys",
          price: 5.99,
          quantity: 0,
          imageUrl:
            "https://i.pinimg.com/736x/86/51/8c/86518c2adfb760bf5e9091841ab6fc9c--girls-flip-flops-beach-flip-flops.jpg"
        },
        {
          id: 3,
          name: "Sun tan lotion",
          description: "Gotta look fly guy",
          price: 7.99,
          quantity: 0,
          imageUrl:
            "https://images.all-free-download.com/images/graphicthumb/summer_cream_protect_lotion_design_vector_582414.jpg"
        }
      ],
      camping: [
        {
          id: 2,
          name: "Tent",
          description: "TENTS",
          price: 6.99,
          quantity: 0,
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhEXFLblyNPD1fknwWEaJ-sc_t6o0NANN1ZHltRn6CuEbJUTT0aQ"
        },
        {
          id: 4,
          name: "Mice",
          description: "Not blind",
          price: 8.99,
          quantity: 0,
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Assorted_computer_mice_-_MfK_Bern.jpg/220px-Assorted_computer_mice_-_MfK_Bern.jpg"
        }
      ]
    };
    this.checkout = this.checkout.bind(this);
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
  }

  componentDidMount(){
    // get api key
    // then get all products
    axios.get('/api/key').then(apiKeyResponse=>{
      const key = apiKeyResponse.data.apiKey;
      axios.get('/api/products?key=' + key)
           .then(productsResponse => {
             console.log('products from server: ___', productsResponse.data)
             this.setState({
               products: productsResponse.data,
               apiKey: key
             })
           })
    })
  }

  toggleDisplay = () => this.setState({ display: this.state.display==="products"?"cart":"products"})
  toggleView = () => this.setState({ cardView: !this.state.cardView });
  handleAddressInput = event => this.setState({ addressInput: event.target.value });
  handleCCInput = event => this.setState({ ccInput: event.target.value });
  deleteFromCart = id => {
    const { cart } = this.state;
    let newCart = cart.map(cartItem => Object.assign({}, cartItem));
    let itemIndex = newCart.findIndex(cartItem => cartItem.id === id);
    console.log("index: ", newCart);
    if (newCart[itemIndex].quantity > 1) {
      newCart[itemIndex].quantity--;
    } else {
      newCart.splice(itemIndex, 1);
    }
    this.setState({ cart: newCart });
  };
  navigate = value => this.setState({ display: value })
  handleSearch = event => this.setState({ searchInput: event.target.value })
  handleAddItemToCart(item) {
    const { cart } = this.state;
    let newCart = cart.map(cartItem => Object.assign({}, cartItem));
    let match = newCart.find(cartItem => cartItem.id === item.id);
    if (match) {
      // item exists on cart
      match.quantity++;
    } else {
      item.quantity++;
      newCart.push(item);
    }
    this.setState({
      cart: newCart
    });
  }
  checkout() {
    if (!this.state.addressInput || !this.state.ccInput) {
      alert("Fill out required fields first.");
    } else if (this.state.cart.length === 0) {
      alert("cart is empty.");
    } else {
      alert("Here's yer stuff");
      this.setState({
        cart: [],
        addressInput: "",
        ccInput: ""
      });
    }
  }
  render() {
    return (
      <div>
        <nav className="nav"><span onClick={_=>this.navigate('products')}>products</span> | <span onClick={_=>this.navigate('cart')}>cart</span></nav>
       { this.state.display==="products"
       ? <section className="products">
          <div className="products_header">
            <h1>PRODUCTS</h1>
            <div className="button_container">
            <label>search</label>
            <input type="text" value={this.state.searchInput} onChange={this.handleSearch}/><br/>
            <button onClick={this.toggleView}>toggle view</button>
            </div>
          </div>
          <table className="products_body">
            <thead>
              <th colspan="2">
                <h2>Beach Gear</h2>
              </th>
            </thead>
            {this.state.beachGear.map(item =>{ 
            if (item.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
            return <Product 
              item={item} 
              addToCart={this.handleAddItemToCart} 
              cardView={this.state.cardView}
            />})}
            <thead><th colspan="2">
            <h2>Camping</h2></th>
            </thead>
            {this.state.camping.map(item =>{ 
            if (item.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
            return <Product
              item={item}
              addToCart={this.handleAddItemToCart}
              cardView={this.state.cardView}
            />})}
          </table>
        </section>
        // else
        : <section className="cart">
          <div className="cart_header">
            <h1>CART</h1>
            <div className="total">
              <table>
                <tr>
                  <td>
                    <label>address</label>
                  </td>
                  <td>
                    <input type="text" value={this.state.addressInput} onChange={this.handleAddressInput} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>credit card number</label>
                  </td>
                  <td>
                    <input type="text" value={this.state.ccInput} onChange={this.handleCCInput} />
                  </td>
                </tr>
              </table>
              <h4>TOTAL</h4>
              <p>
                $
                {this.state.cart
                  .reduce((accumulator, current) => (accumulator += current.price * current.quantity), 0)
                  .toFixed(2)}
              </p>
              <button onClick={this.checkout}>Checkout</button>
            </div>
          </div>
          <table className="cart_body">
            {this.state.cart.map(item => <CartItem 
              item={item} 
              deleteFromCart={this.deleteFromCart}/>)}
          </table>
        </section> }
      </div>
    );
  }
}

export default App;

// Day 2 starting code starts at day 1's stage 2 solution

// Day2 props
// proptypes, reusable components, functional component props
// 1 - List into seperate components, include add to cart functionality
// 2- Add proptypes onto a list item, Reusable text component, based on props changes styling: header, subtext, list view vs card view required.
// 3 - ?
// 4- Add search filter functionality, onchange or onclick, add navbar buttons at the top that toggle between card and product view. Fake if/else conditional rendering. 1 or 2 opportunitiesOther opportunites that text is a functional component. Improve input validation. changing quantities to 0, removes from cart etc.
// 1 - single screen, sidebar, left side is a list of products.
// 2 - add in props - list component, list item component, clean it up
// 3 - add in axios.
// Each day every project has 4 stages
// day 1
// - 1 mini project + 20-30% more
//     - class, functional, state
//     - list of products, pre-hardcoded onto state. Click add to cart and it adds it to a list on the sidebar. Clicking add to cart multiple times increases the qty.
// - 2 is where the afternoon project is now
//     - get a total, left side, multiple categories. Header for each category that is not seperate component, different background color or header color for each category. Checkout btn, cart is cleared. No nesting state.Each category is a seperate property on state
// - 3 including concepts from previous days: never super complex
//     - user input validation
//     - fake credit card payment
// - 4 black diamond - almost no direction
//     - Delete item out of cart, update quantity, update between list and card view on product side. Idea is conditional rendering.
// Stage 3-4 need to stay independant of other projects. These are the push yourselves levels.
