import logo from "./logo.svg";
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { evaluate } from "mathjs";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: "",
      currentOutput: "",
    };
    this.updateInput = this.updateInput.bind(this);
    this.updateOutput = this.updateOutput.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  updateInput(event) {
    let newInput = event.target.value;
    if (newInput === "=") {
      this.updateOutput();
      return;
    }
    this.setState((state) => ({
      currentInput: state.currentInput + event.target.value,
    }));
  }

  updateTextInput(event) {
    let newInput = event.target.value;
    if (newInput === "=") {
      this.updateOutput();
      return;
    }
    this.setState({
      currentInput: newInput,
    });
  }
  updateOutput() {
    this.setState((state) => ({
      currentOutput: evaluate(this.state.currentInput),
    }));
  }

  handleClick(event) {
    event.preventDefault();
    let btnContent = event.target.value;
    console.log("handling click event");
    this.updateInput(event);
  }

  handleKeyPress(event) {
    console.log("watchin key press events");
    if (event.key === "Enter") {
      // Checking if the 'Enter' key is pressed
      event.preventDefault();
      console.log("Enter key pressed");
      // Call your function or callback here
      this.updateOutput(); // Example callback to trigger
    }
  }
  render() {
    // listing button contents;
    let row1 = "del ( ) mod pi".split(" ");
    let row2 = "7 8 9 / sq(x)".split(" ");
    let row3 = "4 5 6 * root(x)".split(" ");
    let row4 = "1 2 3 - Ans".split(" ");
    let row5 = "0 . % + =".split(" ");
    let rows = [row1, row2, row3, row4, row5];
    return (
      <div>
        <div className="calculator">
          <div className="container pt-3">
            <h3 className="text-center">Calculator | Basic</h3>
            <div id="calc">
              <div className="ioContainer px-1 mb-2">
                <div className="row mb-1">
                  <input
                    disabled
                    value={this.state.currentOutput}
                    className="col-md-12 px-2"
                    id="outputEl"
                  />
                </div>
                <div className="row">
                  <textarea
                    value={this.state.currentInput}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.updateTextInput}
                    className="col-md-12 px-2"
                    id="inputEl"
                  ></textarea>
                </div>
              </div>
              <div id="calcContainer">
                {rows.map((row, idx) => (
                  <div key={idx} className="row">
                    {row.map((text) => (
                      <button
                        key={text}
                        onClick={this.handleClick}
                        value={text}
                        className="col button rounded-2 m-1 f-20"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
        <Calculator />
      </div>
    );
  }
}

export default App;
