import React from 'react';
import './css/ItemsPerPage.css';

const ItemsPerPage = (props) => { 
  return (
    <div className="products-per-page">
      <select onChange={props.onChange} id="items-per-page">
        <option id="first-opt" value="6" defaultValue="selected">6 produtos por página</option>
        <option id="second-opt" value="12">12 produtos por página</option>
        <option id="third-opt" value="24">24 produtos por página</option>
      </select>
    </div>
  );
}

export default ItemsPerPage;