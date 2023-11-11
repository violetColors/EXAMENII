
import React from 'react';
import logo from './logo.png'; 
import SearchBar from './SearchBar';

const NavBar = ({ onSearch, zona }) => {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo de NewsHub" />
      </div>
      {/* <ul>
        <li>Inicio</li>
        <li>Acerca de</li>
        <li>Contactanos</li>
      </ul> */}
      <SearchBar onSearch={onSearch} zona={zona} />
    </nav>
  );
};

export default NavBar;
