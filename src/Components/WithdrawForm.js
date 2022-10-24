import React from "react";
import "../styles/WithdrawForm.css";

class WithdrawForm extends React.Component {
  constructor() {
    super();
    this.state = {
      expenseName: "",
      withdrawAmount: 0,
    };
  }
  getInputName = (e) => {
    this.setState({ expenseName: e.target.value });
  };
  getInputAmount = (e) => {
    this.setState({ withdrawAmount: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.withdraw(this.state.expenseName, this.state.withdrawAmount);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={(event) => this.onSubmit(event)}
          className="withdraw-form"
        >
          <h1>Withdraw</h1>
          <input
            onChange={this.getInputName}
            type="text"
            required
            placeholder="Name"
          />
          <input
            onChange={this.getInputAmount}
            type="number"
            required
            placeholder="Amount to withdraw"
          />
          <button className="withdraw-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default WithdrawForm;
