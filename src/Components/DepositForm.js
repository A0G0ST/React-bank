import React from "react";
import "../styles/DepositForm.css";

class DepositForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      depositAmount: 0,
    };
  }

  getInputAmount = (e) => {
    e.preventDefault();
    this.setState({ depositAmount: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.deposit(this.state.depositAmount);
  };

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.onSubmit(e)} className="deposit-form">
          <h1>Deposit</h1>
          <input
            onChange={this.getInputAmount}
            type="number"
            required
            placeholder="Amount to deposit"
          />
          <button className="deposit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default DepositForm;
