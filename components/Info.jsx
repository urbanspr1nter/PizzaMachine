import React from 'react';

class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pizza-info">
        {this.props.content}
      </div>
    );
  }
}

export default Info;
