import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import PizzaMachine from './js/PizzaMachine.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.pizzaMachine = new PizzaMachine();

    this.addIngredientToPizza = this.addIngredientToPizza.bind(this);
  }

  addIngredientToPizza(e) {
    this.pizzaMachine.addIngredientToPizza(e.target.dataset.ingredient);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="pizza-toppings-control-panel">
          <div className="pizza-toppings-control-panel-buttons">
            <button data-ingredient="Sauce" onClick={this.addIngredientToPizza} type="button">Sauce</button>
            <button data-ingredient="Cheese" onClick={this.addIngredientToPizza} type="button">Cheese</button>
            <button data-ingredient="Pepperoni" onClick={this.addIngredientToPizza} type="button">Pepperoni</button>
            <button data-ingredient="Green Peppers" onClick={this.addIngredientToPizza} type="button">Green Peppers</button>
            <button data-ingredient="Olives" onClick={this.addIngredientToPizza} type="button">Olives</button>
            <button data-ingredient="Mushroom" onClick={this.addIngredientToPizza} type="button">Mushroom</button>
          </div>
          <div className="pizza-toppings-preview"></div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default App;
