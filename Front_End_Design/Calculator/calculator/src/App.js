import logo from "./logo.svg";
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";

/* #### User story One
 * - User clicks buttons denoting expression for which they need calculation
 *    - Listen for click event, prevent button default action, update inputStat
 * - User clicks enter to evaluate the calculation
 *    - Validate expression , return error if any bloopers are found
 *      - turn input string into a list and pop out elements one by one
 *      - if element is a number string, it is an operand, turn it into a digit
 *        and add it to some storage buffer then continue popping items from th e list.
 *      - if anything that is not an operand or a number is encountered, return error
 *      - if another number is encountered, append it to the buffer after parsing it to digit data type.
 *      - if an operator is encountered (one of + / - *), store it in a seperate operator buffer.
 *      - if anything  other than a number or space is encountered on the next pop after detecting an operator, return error.
 *      - If a number is encountered, parse it to string. Now send the expression over to the calculator which will return a result based off of the operand,
 *      - every expression while parsing will therefore have 2 operands and one operator each.
 *      - there shall be two operant buffers and one operator buffer.
 *      - there shall be one result buffer, this shall by default hold the value 0.
 *      - the result buffer will after every evaluation be equal to the result of that evaluation.
 *
 * - User gets the result printed to the screen
 * */

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInputValue: "",
      currentOutputValue: "",
      previousInput: "", // for formatting purposes
      lastResult: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.arithmeticHandler = this.arithmeticHandler.bind(this);
    this.parser = this.parser.bind(this);
    this.isOperand = this.isOperand.bind(this);
    this.isOperator = this.isOperator.bind(this);
    this.operands = "1 2 3 4 5 6 7 8 9 0".split(" ");
    this.operators = "+ * / -".split(" ");
  }

  isOperand(token) {
    if (token !== null) {
      return this.operands.includes(token.toString());
    } else {
      return false;
    }
  }

  isOperator(token) {
    if (token !== null) {
      return this.operators.includes(token.toString());
    }
    return false;
  }

  parser(expressionString) {
    // so that popping seems to be getting items first to last (left to right)
    expressionString = expressionString.split(" ").reverse();
    expressionString = expressionString.filter((item) => item.trim() !== "");
    console.log("Entered parser mode");
    let currentToken;
    let previousToken = this.state.lastResult;
    let result = null;
    let operandOne = null;
    let operandTwo = null;
    let operator = null;
    let expressionFull = false;
    if (expressionString.length <= 1) {
      result = this.arithmeticHandler(operandOne, operator, operandTwo);
      console.log(result);
      return;
    }
    let i = 0;
    while (expressionString.length > 0) {
      currentToken = expressionString.pop();
      i++;
      console.log(
        "popped for the " +
          i +
          "th time. | Expression now: " +
          expressionString +
          " | Pop Value: " +
          currentToken,
      );
      if (this.isOperand(currentToken)) {
        if (previousToken === null) {
          // first token
          operandOne = parseInt(currentToken);
          previousToken = currentToken;
        } else if (this.isOperator(previousToken)) {
          // 4+5, 6+3, +4, -8, /9 scenario
          // we have a full expression
          operandTwo = parseInt(currentToken);
          result = this.arithmeticHandler(operandOne, operator, operandTwo);
          previousToken = toString(result);
        }
      } else if (this.isOperator(currentToken)) {
        if (this.isOperand(previousToken)) {
          // 2+, 2-, 2*, 4/ scenario
          operator = currentToken;
          previousToken = currentToken;
        } else if (previousToken === null) {
          operator = currentToken;
          // error
        }
      }
    }
    this.setState({ lastResult: result, currentOutputValue: result });
  }

  arithmeticHandler(oper1, action, oper2) {
    if (oper1 === null && this.state.lastResult === null) {
      switch (action) {
        case "+":
          return oper2;
        case "-":
          return -oper2;
      }
    } else if (oper1 === null && this.state.lastResult !== null) {
      oper2 = this.state.lastResult;
    }
    if (oper1 === null && oper2 === null && action === null) {
      return this.state.lastResult;
    }
    switch (action) {
      case "*":
        return oper1 * oper2;
      case "+":
        return oper1 + oper2;
      case "-":
        return oper1 - oper2;
      case "/":
        return oper1 / oper2;
      default:
        return;
    }
  }

  handleClick(event) {
    event.preventDefault();
    // update inputState
    let targetValue = event.target.value;
    this.setState({ previousInput: targetValue });
    let validOps = "CLR = + - * / 1 2 3 4 5 6 7 8 9 0".split(" ");

    if (validOps.includes(targetValue)) {
      if (
        this.isOperand(this.state.previousInput) &&
        this.isOperand(targetValue)
      ) {
        console.log("here");
        this.setState((state) => ({
          currentInputValue: state.currentInputValue + targetValue,
        }));
      } else if (targetValue !== "CLR" && targetValue !== "=") {
        this.setState((state) => ({
          currentInputValue: state.currentInputValue + " " + targetValue,
        }));
      } else if (targetValue === "CLR") {
        this.setState({
          currentInputValue: "",
          currentOutputValue: "",
        });
      } else if (targetValue === "=") {
        // modification needed
        let expressionString = this.state.currentInputValue;
        this.parser(expressionString);
      } else {
        this.setState((state) => ({
          currentInputValue: state.currentInputValue + " " + targetValue,
        }));
      }
      // wait for enter button to validate input
    }
  }

  render() {
    // ui setup
    let operands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let operators = "+ - / CLR * =".split(" ");
    return (
      <div>
        <p>Operands:</p>
        {operands.map((operand) => (
          <button
            onClick={this.handleClick}
            className="button btn-secondary"
            value={operand}
            key={operand}
          >
            {operand}
          </button>
        ))}
        <p>Operators:</p>
        {operators.map((operator) => (
          <button
            onClick={this.handleClick}
            className="button btn-secondary"
            value={operator}
            key={operator}
          >
            {operator}
          </button>
        ))}
        <hr />
        <p> This is the output panel </p>
        <input
          value={this.state.currentInputValue}
          className="currentInput"
          disabled
        />
        <input
          value={this.state.currentOutputValue}
          className="currentOutput"
          disabled
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        This is a test line.
        <hr />
        <Calculator />
      </div>
    );
  }
}

export default App;
