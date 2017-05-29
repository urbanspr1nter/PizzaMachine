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
          <div className="pizza-delivered-title">Bad Pizzas - {this.props.badPizzas.length} / 10</div>
          <div className="pizza-delivered-container">
            {
              this.props.badPizzas.map((b) => {
                return (
                  <div className="delivered-pizza" key={i += 1}>
                    <img src="assets/crust.png" />
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
          <div className="pizza-delivered-title">More Toppings - {this.props.moreToppings.length} / 4</div>
          <div className="pizza-delivered-container">
            {
              this.props.moreToppings.map((m) => {
                return (
                  <div className="delivered-pizza" key = {i += 1}>
                    <img src="assets/crust.png" />
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
