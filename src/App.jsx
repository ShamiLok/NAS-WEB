import React from "react";
import Menu from "./components/Menu";
import Storage from "./components/storage/Storage";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }
  render() {
    return(
      <div className="App">
        <header>
          <h1>NAS WEB</h1>
          <Menu />
        </header>
        <Storage />
      </div>
    )
  };

}

export default App;
