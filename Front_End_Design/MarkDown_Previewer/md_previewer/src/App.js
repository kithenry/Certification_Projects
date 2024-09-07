import logo from "./logo.svg";
import "./App.css";
import React from "react";

// Import React and MarkdownIt
import MarkdownIt from "markdown-it";

// Create a MarkdownIt instance with HTML enabled
const mdParser = new MarkdownIt({
  html: true, // Allows HTML to be rendered
  breaks: true, // Allows rendering of \n as <br/>
});

// for handling underlined text
mdParser.inline.ruler.after('emphasis', 'underline', (state, silent) => {
  const start = state.pos;
  const marker = state.src[start];

  // Check if the marker is `+` and followed by another `+`
  if (marker !== '+' || state.src[start + 1] !== '+') {
    return false;
  }

  // Find the start position after the initial `++`
  let match = start + 2;

  // Search for the closing `++`
  while (match < state.src.length) {
    if (state.src[match] === '+' && state.src[match + 1] === '+') {
      // Only proceed if not in silent mode
      if (!silent) {
        // Create tokens for the underlined content
        state.push('underline_open', 'u', 1); // Opening <u> tag
        state.push('text', '', 0).content = state.src.slice(start + 2, match); // Underlined content
        state.push('underline_close', 'u', -1); // Closing </u> tag
      }
      state.pos = match + 2; // Move the position to after the closing `++`
      return true;
    }
    match++;
  }

  return false; // If no closing `++` is found
});

// A React component to render Markdown with HTML
const MarkdownRenderer = ({ content }) => {
  // Parse the Markdown content into HTML
  const renderedHTML = mdParser.render(content);

  return (
    // Render the parsed HTML using dangerouslySetInnerHTML
    <div dangerouslySetInnerHTML={{ __html: renderedHTML }} />
  );
};

// commonmark mode
//const md = markdownit('commonmark')

// default mode

// const mdParser = new MarkdownIt({
//   html: true, // Allows HTML to be rendered
// });
//
// enable everything
// const md = markdownit({
//   linkify: true,
//   html: false,
//   typographer: true,
//   highlight: function (/*str, lang*/) {
//     return "";
//   },
// });

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
    const styles = {
      "min-height": "300px",
    };
    console.log(this.props.markDownText);
    return (
      <div className="previewPane" style={styles}>
        <p className="border ps-2 pt-2 border-dark border-bottom-1">
          Markdown Preview:
        </p>
        <div className="parsedMD px-2 pt-2">
          <MarkdownRenderer content={this.props.markDownText} />
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
        <div className="mb-3 border border-dark editor">
          <p className="ps-2 pt-1 mb-0">Raw Markdown:</p>
          <textarea
            value={this.state.markDownText}
            onInput={this.updateMarkDown}
            className="form-control mb-0"
            rows="3"
          ></textarea>
        </div>
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
        <h1 className="">Markdown Previewer</h1>
        <Editor />
      </div>
    );
  }
}
export default App;
