import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="pizza-header">
        <span>
          <img src="../assets/pizza.png" />
        </span>
        <span>
          <h1>The Pizza Machine</h1>
        </span>
      </header>
    );
  }
};

export default Header;
