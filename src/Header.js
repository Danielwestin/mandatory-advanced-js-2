import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Link} from 'react-router-dom'
import MaterialIcon, {colorPalette} from 'material-icons-react';



class Header extends React.Component {
  constructor(props) {
    super(props);
  }


  render(){
    return (
      <>
        <header>

          <div className="header">
            <div className="gradient">
              <p className="header-text">Movies</p>
            </div>
          </div>

          <div className="links">
            <Link className="margin" to="/"> Main page </Link>
            <Link className="margin" to="/addpage">Addpage</Link>
          </div>

        </header>
      </>
    )
  }
}
export default Header;
