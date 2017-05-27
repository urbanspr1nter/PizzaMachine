import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Info from './components/Info.jsx';
import PizzaMachine from './js/PizzaMachine.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.pizzaMachine = new PizzaMachine();

    this.state = {
      pizzaToppings: [],
      gameState: 'start',
      info: ``
    };

    this.addIngredientToPizza = this.addIngredientToPizza.bind(this);
    this.reset = this.reset.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  setGameState(gameState) {
    this.setState({
      gameState: gameState
    });
  }

  reset() {
    this.setState({
      pizzaToppings: []
    }, function() {
      this.pizzaMachine.resetPizza();

      let buttons = document.getElementsByClassName("pizza-topping-button");
      for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
      }
    });
  }

  getInfo() {
    let info = ``;
    switch(this.state.gameState) {
      case 'more-toppings':
        info = `
          More toppings!!!
        `;
        break;
      case 'yuck':
        info = `
          What is this?! I wanted a pizza, not garbage!
        `;
        break;
      case 'perfect':
        info = `
          This! Now this, is a PIZZA! I will eat this delicious pizza and I'll be back!
        `;
        break;
      default:
        info = `
          DIRECTIONS:
          Hey, you! Arnold is hungry and wants you to make him a pizza.
          He's going to be paying you really good money for it and so, he will be picky on what he wants on his pizza.
          Make him a pizza which he loves and the money is all yours!

          Just be careful! He's not going to give you many chances to get his order wrong.
        `;
        break;
    }

    this.setState({
      info: info
    });
  }

  addIngredientToPizza(e) {
    let ingredientName = e.target.dataset.ingredient;
    let imageSrc = "../assets/crust.png";
    let priority = 0;

    this.pizzaMachine.addIngredientToPizza(ingredientName);

    e.target.disabled = true;

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
        <div className="pizza-info-container">
          <Info content={this.state.info} />
          <div className="pizza-arnold-container">
            <img src="../assets/arnold.jpg" />
          </div>
        </div>
        <div className="pizza-toppings-control-panel">
          <div className="pizza-toppings-control-panel-buttons">
            <button className="pizza-topping-button" data-ingredient="Sauce" onClick={this.addIngredientToPizza} type="button">Sauce</button>
            <button className="pizza-topping-button" data-ingredient="Cheese" onClick={this.addIngredientToPizza} type="button">Cheese</button>
            <button className="pizza-topping-button" data-ingredient="Pepperoni" onClick={this.addIngredientToPizza} type="button">Pepperoni</button>
            <button className="pizza-topping-button" data-ingredient="Green Peppers" onClick={this.addIngredientToPizza} type="button">Green Peppers</button>
            <button className="pizza-topping-button" data-ingredient="Olives" onClick={this.addIngredientToPizza} type="button">Olives</button>
            <button className="pizza-topping-button" data-ingredient="Mushroom" onClick={this.addIngredientToPizza} type="button">Mushroom</button>
            <div className="control-panel-spacer" />
            <button className="pizza-deliver-button" type="button" onClick={this.deliverPizza}>Deliver!</button>
            <button type="button" onClick={this.reset}>Reset</button>
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
