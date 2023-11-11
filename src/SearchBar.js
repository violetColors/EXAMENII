import React, { useState } from 'react';

const SearchBar = ({ onSearch, zona }) => {


  
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por zona..."

        onChange={(e) => zona(e.target.value)}
      />
      <button onClick={()=>{onSearch()}}>Buscar</button>
     {/*  <select onChange={(e)=> {setFiLugar(e.target.value)}}>
    <option value="Pais">Pais</option>
    <option value="Estado">Estado</option>
    <option value="Ciudad">Ciudad</option>
    
  </select> */}

    </div>
    
  );
};

export default SearchBar;
