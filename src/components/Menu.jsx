import React from "react";

class Menu extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        menuOpen: false
      }
    }
    render() {
        return (
            <div id="menu">
                <div id="burger__menu" className={this.state.menuOpen ? 'open' : 'close'} onClick={() => this.setState({menuOpen: !this.state.menuOpen})}>
                  <span></span>
                </div>
                
                <nav id="menu__nav" className={this.state.menuOpen ? 'open' : 'close'}>
                    <ul>
                        <li>Settings</li>
                        <li>Exit</li>
                    </ul>
                    <div className="menu__empty"></div>
                    <div className="menu__theme">
                        <span id="menu__theme_text">Enable dark theme</span>
                        <input type="checkbox" id="menu__theme_switch" />
                        <label htmlFor="menu__theme_switch"></label>
                    </div>
                    <div className="menu__footer">project in development</div>
                </nav>
              </div>
            
        );
    }
    
};

export default Menu