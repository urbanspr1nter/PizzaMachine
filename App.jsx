import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Info from './components/Info.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import PizzaMachine from './js/PizzaMachine.js';
import ScoreBoard from './components/ScoreBoard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.pizzaMachine = new PizzaMachine();

    this.state = {
      pizzaToppings: [],
      gameState: 'start',
      info: ``,
      badPizzas: [],
      moreToppings: []
    };

    this.addIngredientToPizza = this.addIngredientToPizza.bind(this);
    this.clearScoreBoard = this.clearScoreBoard.bind(this);
    this.disableControls = this.disableControls.bind(this);
    this.reset = this.reset.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.setGameState = this.setGameState.bind(this);
    this.deliverHandler = this.deliverHandler.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  clearScoreBoard() {
    this.setState({
      badPizzas: [],
      moreToppings: []
    });
  }

  componentDidMount() {
    this.getInfo();
  }

  startNewGame() {
    this.reset();
    this.pizzaMachine = new PizzaMachine();
    this.setGameState('');
    this.clearScoreBoard();
  }

  deliverHandler() {
    if(this.pizzaMachine.checkBuiltPizza(this.state.pizzaToppings) !== 'perfect' &&
        (this.state.moreToppings.length >= 4 || this.state.badPizzas.length >= 10)) {
      this.disableControls();
      this.setGameState('game-over');
      return;
    }

    if(this.pizzaMachine.checkBuiltPizza(this.state.pizzaToppings) === 'yuck') {
      this.setState({
        badPizzas: this.state.badPizzas.concat([this.state.pizzaToppings])
      }, function() {
        this.setGameState('yuck');
        this.reset();
      });
    }
    else if(this.pizzaMachine.checkBuiltPizza(this.state.pizzaToppings) === 'more-toppings') {
      this.setState({
        moreToppings: this.state.moreToppings.concat([this.state.pizzaToppings])
      }, function() {
        this.setGameState('more-toppings');
        this.reset();
      });
    }
    else {
      this.disableControls();
      this.setGameState('perfect');
    }
  }

  disableControls() {
    let ingredientButtons = document.getElementsByClassName('pizza-topping-button');
    let deliverButton = document.getElementsByClassName('pizza-deliver-button');
    let resetButton = document.getElementsByClassName('pizza-reset-button');

    Array.from(ingredientButtons).forEach((b) => {
      b.disabled = true;
    });

    Array.from(deliverButton).forEach((b) => {
      b.disabled = true;
    });

    Array.from(resetButton).forEach((b) => {
      b.disabled = true;
    });
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

      let ingredientButtons = document.getElementsByClassName("pizza-topping-button");
      let deliverButtons = document.getElementsByClassName('pizza-deliver-button');
      let resetButtons = document.getElementsByClassName('pizza-reset-button');

      Array.from(ingredientButtons).forEach((b) => {
        b.disabled = false;
      });

      Array.from(deliverButtons).forEach((b) => {
        b.disabled = false;
      });

      Array.from(resetButtons).forEach((b) => {
        b.disabled = false;
      });


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
      case 'game-over':
        info = `
          You couldn't make the pizza I wanted! Game, OVER! Now you must go do push-ups with me at da GYM!!!!
        `;
        break;
      default:
        info = `
          Hey, you! I am Arnold and I am hungry!
          Make me a pizza and I will pay you really good money for it, or else I will make you go to da gym!!!
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
        <button className="pizza-button-new-game" onClick={this.startNewGame} type="button">NEW GAME</button>
        <div className="pizza-game-container">
          <ControlPanel
            addIngredientHandler={this.addIngredientToPizza}
            deliverHandler={this.deliverHandler}
            resetHandler={this.reset}
            pizzaToppings={this.state.pizzaToppings} />
          <ScoreBoard badPizzas={this.state.badPizzas} moreToppings={this.state.moreToppings} />
        </div>
        <Footer />
      </div>
    );
  }
};

export default App;
