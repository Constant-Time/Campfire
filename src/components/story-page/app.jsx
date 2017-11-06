class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: window.messageList,
      message: window.messageList[0]
    };
  }
  render() {
    return (
    <div>
      this will be our app html
    </div>);
  }
}

//comment to fix stuff
//
