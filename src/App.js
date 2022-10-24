import React from "react";
import DepositForm from "./Components/DepositForm";
import WithdrawForm from "./Components/WithdrawForm";
import "./styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      balance: 0,
      expense: 0,
      depositList: [],
      expensesList: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("stateNow")) {
      this.setState(JSON.parse(localStorage.getItem("stateNow")));
    }
  }
  componentDidUpdate() {
    localStorage.setItem("stateNow", JSON.stringify(this.state));
  }

  deposit = (number) => {
    if (number < 1) {
      alert("You didnt deposit anything");
      return;
    }
    this.setState({
      budget: this.state.budget + parseInt(number),
      balance: this.state.balance + parseInt(number),
    });
    let depositObject = {
      number: number,
    };
    this.setState({
      depositList: [...this.state.depositList, depositObject],
    });
  };

  renderDepositList = () => {
    return this.state.depositList.map((value, index) => {
      return (
        <div className="deposit-list" key={index}>
          <h1> Deposit</h1>
          <h2 className="money-in"> +{value.number} $</h2>
        </div>
      );
    });
  };

  withdraw = (name, amount) => {
    if (this.state.balance < amount) {
      alert("There is not enough money in your account!");
      return;
    }
    if (amount < 1) {
      alert("What did the item cost?");
      return;
    }
    for (const item of this.state.expensesList) {
      if (item.name === name) {
        alert(
          "The money for this item has already been withdrawn, Add a new item!"
        );
        return;
      }
    }
    let withdrawObject = {
      name: name,
      amount: amount,
    };
    this.setState({
      expense: this.state.expense + parseInt(amount),
      balance: this.state.balance - parseInt(amount),
      expensesList: [...this.state.expensesList, withdrawObject],
    });
  };

  renderWithdrawList = () => {
    return this.state.expensesList.map((value, index) => {
      return (
        <div className="withdraw-list" key={index}>
          <h1>{value.name}</h1>
          <h2 className="money-out">-{value.amount} $</h2>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="form-cont">
          <DepositForm deposit={this.deposit} />
          <WithdrawForm withdraw={this.withdraw} />
        </div>
        <div className="state-cont">
          <h1>Budget: {this.state.budget} $</h1>
          <h1>Balance: {this.state.balance} $</h1>
          <h1>Expenses: {this.state.expense} $</h1>
        </div>
        <div className="history">
          <div className="listh1-cont">
            <h1 className="listh1">Deposit history:</h1>
            <h1 className="listh1">Withdraw history:</h1>
          </div>
          <div className="list-cont">
            <div className="depositlist-container">
              {this.renderDepositList()}
            </div>
            <div className="withdrawlist-container">
              {this.renderWithdrawList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
