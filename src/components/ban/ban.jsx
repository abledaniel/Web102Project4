import React from 'react';
import './ban.css'; 

const Ban = ({ banList }) => {
  return (
    <div className="ban-list-container">
      <h3>Ban List</h3>
      <p>Select an attribute in your listing to ban it</p>
      {banList.map((item, index) => (
        <div key={index} className="ban-item">{item}</div>
      ))}
    </div>
  );
};

export default Ban;
