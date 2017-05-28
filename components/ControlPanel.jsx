import React from 'react';

export default class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pizza-toppings-control-panel">
        <div className="pizza-toppings-control-panel-buttons">
          <button className="pizza-topping-button" data-ingredient="Sauce" onClick={this.props.addIngredientHandler} type="button">Sauce</button>
          <button className="pizza-topping-button" data-ingredient="Cheese" onClick={this.props.addIngredientHandler} type="button">Cheese</button>
          <button className="pizza-topping-button" data-ingredient="Pepperoni" onClick={this.props.addIngredientHandler} type="button">Pepperoni</button>
          <button className="pizza-topping-button" data-ingredient="Green Peppers" onClick={this.props.addIngredientHandler} type="button">Green Peppers</button>
          <button className="pizza-topping-button" data-ingredient="Olives" onClick={this.props.addIngredientHandler} type="button">Olives</button>
          <button className="pizza-topping-button" data-ingredient="Mushroom" onClick={this.props.addIngredientHandler} type="button">Mushroom</button>
          <div className="control-panel-spacer" />
          <button className="pizza-deliver-button" type="button" onClick={this.props.deliverHandler}>Deliver!</button>
          <button type="button" onClick={this.props.resetHandler}>Reset</button>
        </div>
        <div className="pizza-toppings-preview">
          <img src="../assets/crust.png" />
          {
            this.props.pizzaToppings.map((t) => {
              return t.imageElement;
            })
          }
        </div>
      </div>
    );
  }
}
