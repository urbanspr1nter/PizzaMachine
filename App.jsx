import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Info from './components/Info.jsx';
import ControlPanel from './components/ControlPanel.jsx';
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
    this.setGameState = this.setGameState.bind(this);
    this.deliverHandler = this.deliverHandler.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  deliverHandler() {
    console.log("HI");
    if(this.pizzaMachine.checkBuiltPizza(this.state.pizzaToppings) === 'yuck') {
      this.setGameState('yuck');
    }
    else if(this.pizzaMachine.checkBuiltPizza(this.state.pizzaToppings) === 'more-toppings') {
      this.setGameState('more-toppings');
    }
    else {
      this.setGameState('perfect');
    }
  }

  setGameState(gameState) {
    this.setState({
      gameState: gameState
    }, function() {
      this.getInfo();
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
        <ControlPanel
          addIngredientHandler={this.addIngredientToPizza}
          deliverHandler={this.deliverHandler}
          resetHandler={this.reset}
          pizzaToppings={this.state.pizzaToppings} />

        <Footer />
      </div>
    );
  }
};

export default App;
