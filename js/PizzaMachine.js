class PizzaMachine {
  constructor() {
    this.ingredientMap = {
      "i_0": "Sauce",
      "i_1": "Cheese",
      "i_2": "Pepperoni",
      "i_3": "Green Peppers",
      "i_4": "Olives",
      "i_5": "Mushroom"
    };

    this.favoredMap = {
      "i_0": false,
      "i_1": false,
      "i_2": false,
      "i_3": false,
      "i_4": false,
      "i_5": false
    };

    this.getRandomInRange = this.getRandomInRange.bind(this);
    this.checkBuiltPizza = this.checkBuiltPizza.bind(this);
    this.resetPizza = this.resetPizza.bind(this);
    this._init = this._init.bind(this);

    this.totalNumberFavored = this.getRandomInRange(1, 6);
    this.favoredIngredients = {};

    this._init();

    this.currentPizza = [];

    this.numberOfBadPizzas = 0;
    this.numberOfImperfectPizzas = 0;
  }

  _init() {
    let finalTotalNumberFavored = this.totalNumberFavored;
    for(let i = 0; i < this.totalNumberFavored; i++) {
      if(typeof this.favoredIngredients["i_" + i.toString()] !== 'undefined') {
        finalTotalNumberFavored--;
      }
      else {
        this.favoredIngredients["i_" + i.toString()] = this.ingredientMap["i_" + i.toString()];
      }
    }
    this.totalNumberFavored = finalTotalNumberFavored;
  }

  resetPizza() {
    this.currentPizza = [];
  }

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

  getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  checkBuiltPizza() {
    let totalNumberFavoredInBuiltPizza = 0;

    Array.from(this.currentPizza).forEach((ingredient) => {
      console.log(ingredient);
      if(typeof this.favoredIngredients[ingredient] !== true) {
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

};

export default PizzaMachine;
