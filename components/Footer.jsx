import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <footer className="pizza-footer">
        <p>(c) 2017, Roger Ngo</p>
        <p>rogerngo.com</p>
      </footer>
    )
  }
};

export default Footer;
