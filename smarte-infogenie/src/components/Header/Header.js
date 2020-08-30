import React from 'react';
import './Header.css';

class Header extends React.Component {
  
  render() {
    return (
      <header>
        <div className="container">
          <div className="igHeader">
            <span className="igText">Company Details</span>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
