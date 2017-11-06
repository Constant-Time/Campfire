import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import StoryList from './components/storylist.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [{'Title': '1st Title', 'ID': '1st ID'}]

    }
  }

  render() {
    return (
      <div>
        <h2>Hello, this is App</h2>
        <StoryList stories=this.state.stories />
      </div>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
