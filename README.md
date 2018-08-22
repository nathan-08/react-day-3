<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project we will create a e-commerce React application from an start to finish. We will be provided with the basic file structure from create-react-app, but the App.js file is empty. We will be working on this app over the course of three days. Each day's project is divided into four Steps, with the first step being comparable to that day's mini-project and the following steps adding more features or implementing new patterns. You should expect to be able to complete the first two steps on each day, while steps three and four will offer a challenge for 


# Day 1

On this day we will start building our React app. We will create a class component with state in the App.js file. We will practice rendering lists of data from state by looping over them and returning JSX code. At the end of this project you should have a better understanding of the following concepts.

* Components
* State
* Conditional Rendering
* Array.map
* JSX


# Live Example

<a href=#">Click Me!</a>

<img src="#" />

## Setup

- `Fork` and `clone` this repository.
- `cd` into the project directory.
- Run `npm install`.
- After `npm install` has finished run `npm start`.

## Step 1

### Summary

In this step we will create a class component called App, with state. State should have one property, an array of products. You will need to fill this array with a list of products. Each product is represented by an object with the following properties: id (number), imageUrl (string), title (string), price (number), and description (string). The display of our App component should have a left and right side; on the left we will display the list of products. On the right will be the cart, where users can add see the items that they are going to purchase. A user should have the ability to add an item from the products list to the cart by clicking a button. If an item is clicked multiple times, simply add duplicates of that item to the cart. We will implement a quantity counter later on.

### Instructions

- Open `src/App.js`. This file will be empty. Create a class component that is the default export.
* Create an array on state called products and populate it with a few product objects. Each product is represented by an object with the following properties: id (number), imageUrl (string), title (string), price (number), and description (string).
* Create an empty array on state called cart.
- Create two sections in the return statement of App's render method. The first will hold the products list, the other will hold the cart list.
- Create an h1 for each of these divs, to label them as Products and Cart respectively.
- In the products section, map over the products array on state and return a div container with an image, h4, and p tags to represent the data for the specific product. Don't forget to give your outer div a key attribute. There should also be an Add to Cart button, but don't worry about hooking up an onclick function yet.
* In the cart section, map over the cart array and render the product name and price.
- Write a method on the App component called `handleAddToCart`. This will take one parameter, an object, which it will add to the cart array on state. Now we can attach this method to the onClick event listener on the Add to Cart button, and pass in the product object.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `src/App.js`. Create a class component called App that is the default export.

```js
import React, { Component } from "react";

export default class App extends Component {}
```

Now create a constructor, call super, and create our component state. State needs to have a products array, which we will fill with made up products. These need to have an id, imageUrl, title, price, and description.

```js
constructor(props) {
    super(props);
    this.state = {
        products: [{
            id: 1,
            imageUrl: '',
            title: 'fancy hat',
            price: 12.99,
            description: 'has a feather in it.'
        } // ... add a few more
        ],
        cart: []
    }
}
```

Now we create two sections within App's render method; one for products and one for cart.

```js
render(){
    return(
        <div className="App">
            <section className="products">
                <h1>Products</h1>
            </section>
            <section className="cart">
                <h1>Cart</h1>
            </section>
        </div>
    )
}
```

Within the products section, map over the product data on state, in order to render the image, name, description and price into JSX. Also add an Add to Cart button.

```js
<section className="App">
  {this.state.products.map(item => (
    <div>
      <img src={item.imageUrl} />
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <p>{item.price}</p>
      <button>Add to Cart</button>
    </div>
  ))}
</section>
```

Now map over the cart array, to display the name, price, and description within the cart component. Only display the name, description, and price.

```js
<section className="cart">
  {this.state.cart.map(item => (
    <div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <p>{item.price}</p>
    </div>
  ))}
</section>
```

Write a method called `addItemToCart`, that will add the item to the cart array on state. Make sure to create a deep copy of the cart array, to avoid modifying state directly.

```js
addToCart(item){
    const newCart = this.state.cart.map( cartItem => Object.assign({}, cartItem) )
    newCart.push(item)
    this.setState({
        cart: newCart 
    })
}
```

Now use this method as the onclick for our Add to Cart button. Be sure to pass in the product object.

```js
<button onClick={() => this.addToCart(item)}> Add to Cart </button>
```

</details>

## Step 2

### Summary

In this step we will calculate and display the total price from the cart. We will reorganize the products into categories, and store them in seperate arrays on state. E.g. `this.state = { shoes: [...], shirts: [...], hats: [...] }`, where each item on state is an array of product objects. Then display the products sorted into categories with a header for the type of product. We also want to have a checkout button on the cart side. This should clear out the cart and display an alert to inform the user that their purchase has been completed.

### Instructions

* Change the structure of state, so that instead of a products array, there are seperate arrays for different product categories (which you can make up), e.g. shoes, shirts, pants.
* Now map over these arrays within the products section, and create a header for each category.
- Create a container to display the Total amount, at the bottom of the App component; this container can be a div with an 'h1' inside it and a 'p' tag
- This container should also include the Checkout Button, which should call the checkout method, to clear out the cart and call an alert to let the user know that their purchase has been completed.

<details>
<summary> Detailed Instructions </summary>

Here we will create our own categories of products on state

```js
this.state = {
    cart: [],
    hats: [
        {
            id: 1,
            name: 'Fisherman\'s Hat',
            description: 'Headgear commonly used by fishermen. Increases fishing skill marginally.',
            price: 12.99,
            imageUrl: ''
        },
        {
            id: 2, 
            name: 'Metal Hat',
            description: 'Uncomfortable, but sturdy.',
            price: 8.99,
            imageUrl: ''
        }
    ],
    beachGear: [
        {
            id: 3,
            name: 'Tent',
            description: 'Portable shelter.',
            price: 32.99,
            imageUrl: ''
        }
    ]
}
```
Once we have created these product category arrays, we will display them in sections for each category. 

```js
<div className="products">
    <h1>PRODUCTS</h1>
    <h2>Hats</h2>
    {
        this.state.hats.map( item => {
            return(
                <div>
                    <img src={item.imageUrl} />
                    <h4>{item.name}</h4>
                    <p>{item.descrition}</p>
                    <p>{item.price}</p>
                    <button onClick={()=> this.addItemToCart(item)}> Add to Cart </button>
                </div>
            )
        })
    }
    <h2>Beach Gear</h2>
    {
        // ... same as above
    }
</div>
```
Here we will create the Total container. Use the Array.reduce method to sum up the total cost.

```js
<div className="total">
    <h1>TOTAL</h1>
    <p>${
        this.state.cart.reduce((accumulator, current) => (accumulator += current.price), 0)
        }
    </p>
    <button onClick={this.checkout}>Checkout</button>
</div>
```
checkout method on App component
```js
checkout = () => {
    this.setState({
        cart: []
    });
    alert('Purchase is complete!');
}
```

</details>

## Step 3

### Summary

In this step we will add two text input fields on the cart side of our app. These will take in an mailing address and a credit-card number from the user. We want to verify that these fields have been filled out and are not empty when the user goes to checkout. If the user attempts to checkout without filling out both of these fields, call an alert which will inform them of the error.

### Instructions

* At the bottom of our cart section but before the total container, create a div that will be the inputs container. 
* Add an input for address and one for credit card. These should be able to store their values on state.

<details><summary>Detailed Instructions</summary>

Add an inputs container, which will allow the user to enter an address and credit card number.
These input fields should store their value on state, using an onChange event listener. 

```js
<div className="inputs">
    <input placeholder="address" value={this.state.address} onChange={ this.handleAddressInput } />
    <input placeholder="credit card number" value={this.state.creditCard} onChange={this.handleCreditCardInput} />
</div>
```
Now we want to make sure that the user has entered in the required data when they attempt to check out. So we will edit the checkout method to check for this data.

```js
checkout = () => {
    if(!this.state.address || !this.state.creditCard) {
        alert( "Please fill out the required fields" )
    } else {
        alert( "Purchase complete!" )
        this.setState({
            cart: []
        })
    }
}
```

</details>

## Step 4

### Summary

In this step we want to keep track of quantity if there are multiple copies of an item in the cart. We also want to be able to delete an item from the cart. We also want to be able to toggle between a simple list view and a full card view for the products on display, using conditional rendering.

### Instructions

* In order to keep track of quantity, modify the addItemToCart method. When adding to the cart, it should check if the item is already on the cart, and if so, increase that object's quantity value by one.
* Create a deleteFromCart method. This should take in one parameter, an id, which it will use to remove the matching item from the cart array.
* Create a button at the top of the products section, and a method for it called handleToggleView. Create a boolean value on state called toggleView. The handleToggleView method should set the toggleView value on state to its opposite value. We will use this boolean to conditionally render our products. Based on the value of toggleView, we want to switch between a detailed card view and a simple list. You can do this either by writing more JSX, or simply writing two different sets of CSS and toggling classes. 

<details><summary> Detailed Instructions </summary>

Modify the addItemToCart method, so that it can keep track of quantity if their are multiple instances of an item in the cart.

```js
addItemToCart( item ){
    // make a deep copy of the cart array, to avoid mutating state.
    let newCart = this.state.cart.map( cartItem => Object.assign({}, cartItem) )
    let itemIndex = newCart.findIndex( cartItem => cartItem.id === item.id)
    if( itemIndex!== -1){
      newCart[itemIndex].quantity++
    } else {
      item.quantity++
      newCart.push(item)
    }
    this.setState({
      cart:newCart
    })
  }
```

Create a deleteFromCart method that takes an id parameter and removes the matching item from the cart array.

```js
removeItemFromCart( id ){
    let newCart = this.state.cart.map( cartItem => Object.assign({}, cartItem) )
    let itemIndex = newCart.findIndex( cartItem => cartItem.id === id)
    if(newCart[itemIndex].quantity === 1){
      newCart.splice(itemIndex,1)
    }
    else {
      newCart[itemIndex].quantity--
    }
    this.setState({
      cart:newCart
    })
  }
```

Create a Toggle View button at the top of the products section, and create a handleToggleView method which will toggle a toggleView boolean on state.

```js
this.state = {
    toggleView: true,
    // ...
}
```

```js
<button onClick={ this.handleToggleView }>Toggle View</button>
```

```js
handleToggleView = () => this.setState(state => { toggleView: !state.toggleView })
```

Here we will toggle the class of our product elements, to render them either in more detailed card view or list view.

```js
<div className={ this.state.toggleView ? 'product_card' : 'product_list' }>
    // ...
</div>
```

</details>

_____________________________end of day 1_______________________________________

# Day 2

On this day we will be refactoring some of our code to take advantage of some of the tools that React has to offer. You should have gotten to at least step 2 of Day 1, in order to proceed with this project. We will be using reusable functional components to follow the DRY principle, which is, <em>don't repeat yourself</em>. We will pass props into our reusable components. At the end of this project, you should have a better understanding of the following concepts:

* Props
* PropTypes
* Functional Components
* Reusable Components

# Live Example

<a href=#">Click Me!</a>

<img src="#" />

## Setup

- `Fork` and `clone` this repository.
- `cd` into the project directory.
- Run `npm install`.
- After `npm install` has finished run `npm start`.

## Step 1

### Summary

In this step we will create two functional components so that we don't have to repeat ourselves in the code for the list item and the cart item. These components will need to take in props for the specific item. 

### Instructions

* Create a Components folder within `src`. 
* In this folder, create a Product functional component and a CartItem functional component.
* Product should take in as props the item object, the addItem method, and the toggleView value from state.
* The CartItem component should take in the item object. 
* Since we are passing the addItem method, we need to bind this.
* Now, where you are mapping over products in the products section and the cart section, replace that block of code with our new functional components, passing in the required props.

<details><summary> Detailed Instructions </summary>

Create a Components folder with a `CartItem.js` and `Product.js` file.

`CartItem.js` should be a functional component that can take in an item object as a prop, and render the name and price in the appropriate HTML tags. 

```js
import React from 'react';

function CartItem (props) {
    const { item } = props;
    return (
        <div>
            <h4>{item.name}</h4>
            <p>{item.price}</p>
        </div>
    );

}
export default CartItem;
```

The Product component should also be a functional component that takes in props.

```js
import React from "react";

function Product (props) {
  const { item, cardView } = props;
  return cardView ? (
    <div>
      <h4>{item.name}</h4>
      <p>{item.price}</p>
      <button onClick={() => props.addItem(item)}>Add to Cart</button>
    </div>
  ) : (
    <div>
      <img src={item.imageUrl} alt="the item" />
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <p>{item.price}</p>
      <button onClick={() => props.addItem(item)}>Add to Cart</button>
    </div>
  );
}

export default Product;
```

Since we are passing in a method to this component, we need to bind it so that it preserves the right `this` context. We can do this at the end of App's constructor function.

```js
this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
```

Now we can use these functional components in place of the JSX we had written when mapping over the products array. Here is the example for mapping over the products for the Camping category (you get to make up your own product categories).

```js
import Product from './Components/Product'
// ...
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
```

Then we will do the same for the Cart Items. Remeber, with one line arrow functions, we don't need an explicit return statement.

```js
<h1>CART</h1>
{
  this.state.cart.map( item => <CartItem item={item} /> )
}
```


</details>

## Step 2 

### Summary

In this step we will start using the PropsTypes library, to provide better documentation and error handling for our reusable components. We will also implement a reusable Text component that can render headers or paragraphs depending on its props. 

### Instructions

* Install the Proptypes library, `npm install prop-types`.
* Now inside the Product component import proptypes and create a Product.propTypes object (see deatiled instructions)
* Create proptypes for the CartItem component.
* Let's create a Text functional component that takes two props, a string called text and a boolean called isHeader. Then have this component render the string as either a 'p' tag or h4, depending on the value of 'isHeader'
* Now use the Text component inside of our Product and CartItem components whereever you have an h4 or p tag.

<details><summary> Detailed Instructions </summary> 

Install the proptypes library with `npm install prop-types`, and then import this into the Product and CartItem components

```js
import PropTypes from 'prop-types'
```

Now using the proptypes library, define a propTypes object for our two reusable components. Here is the propTypes object for the Product component.

```js
// after the Product function declaration
Product.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }),
  addItem: PropTypes.func.isRequired,
  cardView: PropTypes.bool.isRequired
}
```

Create a reusable functional component called Text which can take two props and render a string in either a p or h4 tag. Use Proptypes.

```js
import React from 'react'
import PropTypes from 'prop-types'

function Text(props) {
  const { test, isHeader } = props;
  return isHeader ? <h4>{text}</h4> : <p>{text}</p>; 
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
  isHeader: PropTypes.bool.isRequired
}
```

Now we can use this Text component inside our Product and CartItem components to replace blocks of text. 

```js
import Text from "./Text";
// ...
<Text text={item.name} isHeader={true} />
<Text text={"$" + item.price} isHeader={false} />
// ...
```

</details> 

## Step 3 ___ NO STEP 3 ___

### Summary

### Instructions

<details><summary> Detailed Instructions </summary>
</details>

## Step 4 

### Summary

In this step we will add a search bar which can filter the list of products. We will also add a navbar at the top of the app that can toggle between product and cart view. 

### Instructions

* In the products section under the header, create an input that will be our search bar. Store its value on state and create an on-change event listener that will update state with the user input. 
* Now we need to change the code where we map over products to display, so that we are filtering based on the user input string, if the user has typed anything. 
* Let's add a Navbar with a couple buttons at the top of the app. This should give the user the ability to toggle between Product View and Cart View, by changing a boolean value on state. You will need to use conditional rendering (with the ternary operator), so that only one view is displayed at a time. 

<details><summary> Detailed Instructions </summary>

Let's create an input field for the user to search through the products. Under the products header,

```js
<p>Search Product Names: </p>
<input value={this.state.searchFilter} onChange={ e => this.setState({ searchFilter: e.target.value })}/>
```

Now we need to adjust our code where we are mapping over the product arrays, to filter these if the user has typed something.
We can chain the map function onto the filter function because filter returns an array.

```js
<h2>Beach Gear</h2>
{
  this.state.beachGear
  .filter( item => item.name.includes(this.state.searchFilter.toLowerCase()))
  .map( item => (
    <Product
      item={item}
      addItem={this.handleAddItemToCart}
      cardView={this.state.toggleCard}
  ))

}
```

Now to create a navbar with the options to toggle between cart and product view. We can also put our button in here which switches the product display type from card to list view. 

```js
<nav>
  <button onClick={this.toggleCardView}> Toggle View </button>
  <button onClick={_=>this.setState({ currentView: "products" })}>   Shop        </button>
  <button onClick={_=>this.setState({ currentView: "cart"    })}>    View Cart   </button>
</nav>
```

Now we just need to conditionally render our products and cart sections depending on the value of `this.state.currentView`

```js
render() {
  return (
    <div>
      <nav> 
        // ...
      </nav>
      {
        this.state.currentView === "products" 
        ? <section className="products">
          // ...
        </section>
        : <section className="cart">
          // ...
        </section>
      }
    </div>
  )
}
```

</details>

___________________________end of day 2____________________________________

# Day 3

Today we will be focusing on making HTTP requests using the axios package.

* Components
* State
* Conditional Rendering
* Array.map
* JSX

## Step 1



### Summary

In Step 1 we will use axios to get a list of products from the server. We will be able to add products to the server. In order to access the server, we will get an API key. This needs to be applied to all http requests as a query called "key".

### Instructions

* Refer to API docs to get an API key. Store this key on state. This will be used as a query parameter in all other requests.
* Once we have an API key, we need to get all products from the API. (both of these steps can happen in componentDidMount)
* We will create a form where users can create a new product and submit it to the server. This should take in a name, desscriptions, price, and image url. 

<details><summary> Detailed Instructions </summary>

We need to get an API key, and then get a the list of products. Then store these on state.

```js
componentDidMount() {
  axios.get('{{{BASEURL}}}/api/key')
       .then( apiKeyResponse => {
         // api key is on response.data.apiKey
        axios.get('{{{BASEURL}}}/api/products?key='+apiKeyResponse.data.apiKey)
             .then( productsResponse => {
               this.setState({
                 apiKey: apiKeyResponse.data.apiKey,
                 products: productsResponse.data
               })
             })
       })
}
```
We can create an AddProduct component, which will be a container of inputs, and take in a function as a parameter to be able to submit the data to the server.


in App.js
```js
addProduct( product ) {
  axios.post('{{{BASEURL}}}/api/?key='+this.state.apiKey, product)
       .then( response => this.setState({ products: response.data }))
}
// ...
render(){
  return (
    <AddProduct addItem={this.addProduct}/>
    // ...
```
in AddProduct.js
```js
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
    handleImage( image ){
        this.setState({
            imageInput:image
        })
    }
    
    render() {
        const { nameInput, descriptionInput, priceInput, imageInput } = this.state;
        return (
            <div>
                <p>Name: </p>
                <input onChange={e => this.handleName(e.target.value)} value={nameInput}/>
                <p>Description: </p>
                <input onChange={e => this.handleDescription(e.target.value)} value={descriptionInput}/>
                <p>Price: </p>
                <input onChange={e => this.handlePrice(e.target.value)} value={priceInput}/>
                <p>Image: </p>
                <input onChange={e => this.handleImage(e.target.value)} value={imageInput}/>
                <button onClick={() => this.props.addProduct({name:nameInput, description:descriptionInput, price:priceInput, image:imageInput})}>Submit</button>
            </div>
        );
    }
}

export default AddProduct;
```


</details>

## Step 2

### Summary

In this step we will be changing up the way we handle the cart. All the cart will be stored on the server, and we will have to use HTTP requests to add or remove items from the cart. 

### Instructions

* `handleAddItemToCart` should be refactored to make an axios post to the appropriate endpoint (see API docs).
* `handleRemoveItemFromCart` should be refactored to make an axios PUT (we are editing the qty of an item, not necessarily deleting it). Again, refer to the API  docs on which enpoint to hit and how to format the request. 

<details><summary> Detailed Instructions </summary>

Let's refactor our `handleAddItemToCart` method to use axios and send the request to the API

```js
handleAddItemToCart( item ) {
  axios.post(`{{{BASEURL}}}/api/products/${item}?key=${this.state.apiKey}`)
       .then(response => this.setState({ cart: response.data }))
}
```

Let's do the same with `removeItemFromCart`.

```js
removeItemFromCart( item ) {
  axios.delete(`{{{BASEURL}}}/api/products/${item}?key=${this.state.apiKey}`)
       .then(response => this.setState({ cart: response.data }))
  }
}
```

</details>

## Step 3 


### Summary

In this step we will create a reusable button component, and then replace all of the buttons in our app with this component. 

### Instructions

* Create a Button.jsx file and create a functional component in this file as the default export. 
* This component should take two props, for the button text and onclick function.

`Button.jsx`
```js
import React from 'react'
import propTypes from 'prop-types'

function Button (props) {
    return <button onClick={props.handleClick}>{props.text}</button>;
}

Button.propTypes = {
    handleClick: propTypes.func.isRequired,
    text: propTypes.string.isRequired
}

export default Button
```

<details><summary> Detailed Instructions </summary>
</details>

## Step 4 

### Summary



### Instructions

<details><summary> Detailed Instructions </summary>
</details>