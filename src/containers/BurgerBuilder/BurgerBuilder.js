import React, { Component } from 'react'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 0.5,
  tomato: 0.5,
  cheese: 0.7,
  veganSteak: 1.5,
  bacon: 0.8
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      tomato: 0,
      veganSteak: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 3,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseSate = (ingredients) => {
    const sum = Object.keys(ingredients)
      .reduce((sum,igKey) => {
        return sum + ingredients[igKey]
      }, 0)
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1
    const updatedIngredients = {
      ...this.state.ingredients,
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type];
    const updatedPrice = this.state.totalPrice + priceAddition 
    this.setState({
      totalPrice: updatedPrice, ingredients: updatedIngredients
    })
    this.updatePurchaseSate(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount === 0) return;
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients,
    }
    updatedIngredients[type] = updatedCount
    const priceDeduction = INGREDIENT_PRICES[type];
    const updatedPrice = this.state.totalPrice - priceDeduction
    this.setState({
      totalPrice: updatedPrice, ingredients: updatedIngredients
    })
    this.updatePurchaseSate(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Arthur PENDRAGON",
        address: {
          street: 'magicalstreet 43',
          zipCode: '12345',
          city: 'unknown',
          country: 'France'
        },
        email: 'lol@mdr.xd'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>
        </Modal> 
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
          purchasable={this.state.purchasable}/>
      </Auxiliary>
    )
  }
}

export default BurgerBuilder;