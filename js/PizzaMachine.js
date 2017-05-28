/*
  The Pizza Machine

  Game logic that drives the "back-end" of the web game.
*/

export default class PizzaMachine {
  constructor() {
    /*
      The map of ingredients. The key is the code, the value is the ingredient name.
    */
    this.ingredientMap = {
      "i_0": "Sauce",
      "i_1": "Cheese",
      "i_2": "Pepperoni",
      "i_3": "Green Peppers",
      "i_4": "Olives",
      "i_5": "Mushroom"
    };

    /*
      Keeps track of which ingredients are actually favored by the customer, so we can
      check later.
    */
    this.favoredMap = {
      "i_0": false,
      "i_1": false,
      "i_2": false,
      "i_3": false,
      "i_4": false,
      "i_5": false
    };

    /*
      Bind this instance to the functions.
    */
    this.addIngredientToPizza = this.addIngredientToPizza.bind(this);
    this.checkBuiltPizza = this.checkBuiltPizza.bind(this);
    this.resetPizza = this.resetPizza.bind(this);
    this._init = this._init.bind(this);

    /*
      Get the total number of favored ingredients.

      This will change based on the random ingredients picked out in the _init
      routine.
    */
    this.totalNumberFavored = this.getRandomInRange(1, 6);

    /*
      Stores the favored ingredients.
    */
    this.favoredIngredients = {};

    this._init();

    this.currentPizza = [];

    /*
      Keeps track of the number of bad pizzas
    */
    this.numberOfBadPizzas = 0;

    /*
      Keeps track of the number of imperfect pizzas
    */
    this.numberOfImperfectPizzas = 0;
  }

  /**
    The initialization routine to figure out the true total number of favored toppings
    for what the customer wants.
   */
  _init() {
    let finalTotalNumberFavored = this.totalNumberFavored;

    for(let i = 0; i < this.totalNumberFavored; i++) {
      if(typeof this.favoredIngredients["i_" + i.toString()] !== 'undefined') {
        finalTotalNumberFavored--;
      }
      else {
        this.favoredIngredients["i_" + i.toString()] = this.ingredientMap["i_" + i.toString()];
        this.favoredMap["i_" + i.toString()] = true;
      }
    }
    this.totalNumberFavored = finalTotalNumberFavored;
  }

  /*
    Basically adds an ingredient to the current pizza that will be delivered.
  */
  addIngredientToPizza(ingredient) {
    switch(ingredient) {
      case "Sauce":
        this.currentPizza.push("i_0");
        break;
      case "Cheese":
        this.currentPizza.push("i_1");
        break;
      case "Pepperoni":
        this.currentPizza.push("i_2");
        break;
      case "Green Peppers":
        this.currentPizza.push("i_3");
        break;
      case "Olives":
        this.currentPizza.push("i_4");
        break;
      case "Mushroom":
        this.currentPizza.push("i_5");
        break;
      default:
        break;
    }
  }

  /*
    The logic that will check the pizza that is being delivered to the customer
    and determines if it is the pizza in which the customer really wants.
  */
  checkBuiltPizza() {
    let totalNumberFavoredInBuiltPizza = 0;

    Array.from(this.currentPizza).forEach((ingredient) => {
      console.log(ingredient);
      if(typeof this.favoredMap[ingredient] !== false) {
        totalNumberFavoredInBuiltPizza += 1;
      }
      else {
        this.numberOfBadPizzas += 1;
        return 'yuck';
      }
    });

    if(totalNumberFavoredInBuiltPizza === this.totalNumberFavored) {
      return 'perfect';
    }
    else if(totalNumberFavoredInBuiltPizza < this.totalNumberFavored) {
      this.numberOfImperfectPizzas += 1;
      return 'more-toppings';
    }
    else {
      this.numberOfBadPizzas += 1;
      return 'yuck';
    }
  }

  /*
    A utility method to get a random number in the range of [min, max] (inclusive).
  */
  getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /*
    Resets the current pizza being assembled.
  */
  resetPizza() {
    this.currentPizza = [];
  }
}
