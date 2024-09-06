import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Markdown from "react-markdown";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class Previewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.markDownText);
    return (
      <div>
        <h2>Markdown Preview</h2>
        <div className="parsedMD">
          <Markdown>{this.props.markDownText}</Markdown>
        </div>
      </div>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markDownText: "",
    };
    this.updateMarkDown = this.updateMarkDown.bind(this);
  }

  updateMarkDown(event) {
    this.setState({
      markDownText: event.target.value,
    });
  }

  render() {
    return (
      <div className="">
        <textarea
          value={this.state.markDownText}
          onInput={this.updateMarkDown}
          className="form-control"
          rows="3"
        ></textarea>
        <Previewer markDownText={this.state.markDownText} />
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
      <div className="App">
        <h1>MD Previewer</h1>
        <Editor />
      </div>
    );
  }
}
export default App;
