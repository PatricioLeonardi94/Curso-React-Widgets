import React, { useState } from "react";

const Accordion = ({ items }) => {
  // Hooks array deconstruct activeIndex tiene el valor de la posicion 0 del aray useState,
  //setActiveIndex tiene el valor 1 del array useState
  // el primero inicializado en null y el setActiveIndex modifica ese valor del primero
  // siempre q se llame a esa funcion
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  const renderItems = items.map((item, index) => {
    const active = index === activeIndex ? "active" : "";

    return (
      <React.Fragment key={item.title}>
        <div
          className={`title ${active}`}
          // sino hacemos arrow function se ejecutan todos en el render de una
          // Por eso queremos que se ejecute solo cuando se clickea
          onClick={() => onTitleClick(index)}
        >
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="ui styled accordion">
      {renderItems}
    </div>
  );
};

export default Accordion;
