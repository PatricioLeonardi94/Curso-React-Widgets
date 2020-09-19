import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  /*con useRef podemos indicar una referencia a una part del codifo espacial de html. 
  A partir de ahi podemos usar current para saber el q referenciamos y contains nos 
  dice si el elemento es hijo grafico del mismop */

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)){
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, [])

  const renderOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    //le asignamos ref para verificar si lo que clickeamos esta dentro del ui form
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label" >{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div
            onClick={() => setOpen(!open)}
            className={`menu ${open ? "visible transition" : ""}`}
          >
            {renderOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
