import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import PizzaMachine from './js/PizzaMachine.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.pizzaMachine = new PizzaMachine();

    this.state = {
      pizzaToppings: []
    };

    this.addIngredientToPizza = this.addIngredientToPizza.bind(this);
  }

  addIngredientToPizza(e) {
    let ingredientName = e.target.dataset.ingredient;

    this.pizzaMachine.addIngredientToPizza(ingredientName);

    let imageSrc = "../assets/crust.png";
    let priority = 0;

    switch(ingredientName) {
      case "Sauce":
        imageSrc = "../assets/sauce.png";
        priority = 1;
        break;
      case "Cheese":
        imageSrc = "../assets/cheese.png";
        priority = 2;
        break;
      case "Pepperoni":
        imageSrc = "../assets/pepperoni.png";
        priority = 3;
        break;
      case "Green Peppers":
        imageSrc = "../assets/green_peppers.png";
        priority = 4;
        break;
      case "Olives":
        imageSrc = "../assets/olives.png";
        priority = 5;
        break;
      case "Mushroom":
        imageSrc = "../assets/mushrooms.png";
        priority = 6;
        break;
      default:
        break;
    }

    this.setState({
      pizzaToppings: [
        {
          imagePriority: priority,
          imageElement: <img src={imageSrc} key={priority} />
        }
      ].concat(this.state.pizzaToppings).sort((a, b) => {
        if(a.imagePriority < b.imagePriority) {
          return -1;
        }
        else if(a.imagePriority > b.imagePriority) {
          return 1;
        }

        return 0;
      }),
    });
  }

  componentWillUpdate() {

  }

  render() {
    let i = 0;

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
          <div className="pizza-toppings-preview">
            <img src="../assets/crust.png" />
            {
              this.state.pizzaToppings.map((t) => {
                return t.imageElement;
              })
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default App;
