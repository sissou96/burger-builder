import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from './BurgerIngredient.css'

class BurgerIngredient extends Component{
  
  render() {
    let ingredient = null;
    switch (this.props.type) {
      case ('breadBottom'):
        ingredient = <div className={classes.BreadBottom}></div>
        break;
      case ('breadTop'):
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        )
        break;
      case ('veganSteak'):
        ingredient = <div className={classes.VeganSteak}></div>
        break;
      case ('cheese'):
        ingredient = <div className={classes.Cheese}></div>
        break;
      case ('salad'):
        ingredient = <div className={classes.Salad}></div>
        break;
      case ('bacon'):
        ingredient = <div className={classes.Bacon}></div>
        break;
      case ('tomato'):
        ingredient = <div className={classes.Tomato}></div>
        break;
      default:
        ingredient = null
    }
    return ingredient
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient