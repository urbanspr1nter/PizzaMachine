import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="pizza-header">
        <h1>The Pizza Machine</h1>
      </header>
    );
  }
};

export default Header;
