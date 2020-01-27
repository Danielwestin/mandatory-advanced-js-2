import React from 'react';
import './App.css';
import {Link} from 'react-router-dom'

class Header extends React.Component {

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
            <Link className="link-margin" to="/"> Main page </Link>
            <Link className="link-margin" to="/addpage">Addpage</Link>
          </div>

        </header>
      </>
    )
  }
}
export default Header;
