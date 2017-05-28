import React from 'react';

export default class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let i = 0;

    return (
      <div className="pizza-scoreboard">
        <div className="pizza-delivered-container">
          <div className="pizza-delivered-title">Bad Pizzas - {this.props.badPizzas.length}</div>
          <div className="pizza-delivered-container">
            {
              this.props.badPizzas.map((b) => {
                return (
                  <div key={i += 1}>
                    {
                      b.map((el) => {
                        return (
                          el.imageElement
                        )
                      })
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="pizza-delivered-container">
          <div className="pizza-delivered-title">More Toppings - {this.props.moreToppings.length}</div>
          <div className="pizza-delivered-container">
            {
              this.props.moreToppings.map((m) => {
                return (
                  <div key = {i += 1}>
                    {
                      m.map((el) => {
                        return (
                          el.imageElement
                        )
                      })
                    }
                  </div>
                );
              })
            }
          </div>
        </div>

      </div>
    );
  }
}
