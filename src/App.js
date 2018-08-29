import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Product from "./Components/Product";
import CartItem from "./Components/CartItem";
import Button from './Components/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressInput: "",
      ccInput: "",
      display: "products",
      cart: [],
      apiKey: "",
      searchInput: "",
      cardView: true,
      products: [],
      camping: [],
      candy: [],
      clothing: [],
      food: [],
      nameInput: "",
      descriptionInput: "",
      imageURLInput: "",
      priceInput: null,
      categoryInput: ""
    };
    this.checkout = this.checkout.bind(this);
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
  }

  componentDidMount() {
    // get api key
    // then get all products
    axios.get("/api/key").then(apiKeyResponse => {
      const key = apiKeyResponse.data.apiKey;
      axios.get("/api/products?key=" + key).then(productsResponse => {
        console.log("products from server: ___", productsResponse.data);
        productsResponse.data.forEach(item => (item.quantity = 0));
        // filter results onto arrays
        let camping = productsResponse.data.filter(item => item.category === "camping");
        let candy = productsResponse.data.filter(item => item.category === "candy");
        let clothing = productsResponse.data.filter(item => item.category === "clothing");
        let food = productsResponse.data.filter(item => item.category === "food");
        this.setState({
          products: productsResponse.data,
          apiKey: key,
          camping,
          candy,
          clothing,
          food
        });
      });
    });
  }
  createNewProduct = () => {
    // post new product to server
    // name, desc, price, imageURL
    let {
      nameInput: name,
      descriptionInput: description,
      priceInput: price,
      imageURLInput: image,
      categoryInput: category,
      apiKey: key
    } = this.state;
    price = parseFloat(price);
    const newProduct = { name, description, price, category, image };
    axios.post("/api/products?key=" + key, newProduct).then(productsResponse => {
      console.log("products from server: ___", productsResponse.data);
      productsResponse.data.forEach(item => (item.quantity = 0));
      // filter results onto arrays
      let camping = productsResponse.data.filter(item => item.category === "camping");
      let candy = productsResponse.data.filter(item => item.category === "candy");
      let clothing = productsResponse.data.filter(item => item.category === "clothing");
      let food = productsResponse.data.filter(item => item.category === "food");
      this.setState({
        products: productsResponse.data,
        apiKey: key,
        camping,
        candy,
        clothing,
        food
      });
    });
  };
  toggleDisplay = () => this.setState({ display: this.state.display === "products" ? "cart" : "products" });
  toggleView = () => this.setState({ cardView: !this.state.cardView });
  handleAddressInput = event => this.setState({ addressInput: event.target.value });
  handleCCInput = event => this.setState({ ccInput: event.target.value });
  deleteFromCart = itemID => {
    axios
      .delete("/api/cart/" + itemID + "?key=" + this.state.apiKey)
      .then(cartResponse => this.setState({ cart: cartResponse.data }));
  };
  navigate = value => this.setState({ display: value });
  handleSearch = event => this.setState({ searchInput: event.target.value });
  handleAddItemToCart(itemID) {
    axios
      .post("/api/cart/" + itemID + "?key=" + this.state.apiKey)
      .then(cartResponse => this.setState({ cart: cartResponse.data }));
  }
  checkout() {
    if (!this.state.addressInput || !this.state.ccInput) {
      alert("Fill out required fields first.");
    } else if (this.state.cart.length === 0) {
      alert("cart is empty.");
    } else {
      alert("Here's yer stuff");
      axios.delete("api/cart/checkout?key=" + this.state.apiKey).then(checkoutResponse => {
        this.setState({
          cart: checkoutResponse.data,
          addressInput: "",
          ccInput: ""
        });
      });
    }
  }
  render() {
    console.log("___", this.state);

    return (
      <div>
        <nav className="nav">
          <span onClick={_ => this.navigate("products")}>products</span> |{" "}
          <span onClick={_ => this.navigate("cart")}>cart</span>
        </nav>
        {this.state.display === "products" ? (
          <section className="products">
            <div className="products_header">
              <h1>PRODUCTS</h1>
              <div className="button_container">
                <label>search</label>
                <input type="text" value={this.state.searchInput} onChange={this.handleSearch} />
                <br />
                <Button handleClick={this.toggleView} test="toggle view">toggle view</Button>
              </div>
            </div>
            <div className="new-product-form">
              <table>
                <th colSpan="2">
                  <h4>Create New Product</h4>
                </th>
                <tr>
                  <td>name: </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.nameInput}
                      onChange={event => this.setState({ nameInput: event.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td>description: </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.descriptionInput}
                      onChange={event => this.setState({ descriptionInput: event.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td>image URL: </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.imageURLInput}
                      onChange={event => this.setState({ imageURLInput: event.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td>category: </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.categoryInput}
                      onChange={event => this.setState({ categoryInput: event.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td>price: </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.priceInput}
                      onChange={event => this.setState({ priceInput: event.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Button handleClick={this.createNewProduct}text="submit"/>
                  </td>
                </tr>
              </table>
            </div>
            <table className="products_body">
              <thead>
                <th colSpan="2">
                  <h2>Camping</h2>
                </th>
              </thead>
              {this.state.camping.map(item => {
                if (item.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
                  return <Product item={item} addToCart={this.handleAddItemToCart} cardView={this.state.cardView} />;
              })}

              <thead>
                <th colSpan="2">
                  <h2>Candy</h2>
                </th>
              </thead>
              {this.state.candy.map(item => {
                if (item.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
                  return <Product item={item} addToCart={this.handleAddItemToCart} cardView={this.state.cardView} />;
              })}

              <thead>
                <th colSpan="2">
                  <h2>Clothing</h2>
                </th>
              </thead>
              {this.state.clothing.map(item => {
                if (item.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
                  return <Product item={item} addToCart={this.handleAddItemToCart} cardView={this.state.cardView} />;
              })}

              <thead>
                <th colSpan="2">
                  <h2>Food</h2>
                </th>
              </thead>
              {this.state.food.map(item => {
                if (item.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
                  return <Product item={item} addToCart={this.handleAddItemToCart} cardView={this.state.cardView} />;
              })}
            </table>
          </section>
        ) : (
          // else
          <section className="cart">
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
                <Button handleClick={this.checkout} text="Checkout"/>
              </div>
            </div>
            <table className="cart_body">
              {this.state.cart.map(item => (
                <CartItem item={item} deleteFromCart={this.deleteFromCart} />
              ))}
            </table>
          </section>
        )}
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
