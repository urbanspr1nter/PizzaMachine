import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="pizza-toppings-control-panel">
          <div className="pizza-toppings-control-panel-buttons">
            <button type="button">Sauce</button>
            <button type="button">Cheese</button>
            <button type="button">Pepperoni</button>
            <button type="button">Green Peppers</button>
            <button type="button">Olives</button>
            <button type="button">Mushroom</button>
          </div>
          <div className="pizza-toppings-preview"></div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default App;
