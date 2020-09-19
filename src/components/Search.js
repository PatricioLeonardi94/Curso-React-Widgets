import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");
  //debounce significa esto de poner un timer para esperar el termino buscado
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);


  /* 
  Para no tener problemas con el useEffect que nos da un warning con un posible bug
  en la utilizacion del mismo, en el momento que no se agregan todos los props o states al mismo
  para solucionarlo se agregan todos. Pero esto genera otro bug que corresponde a volver a hacer
  render del primer elemento (un doble render al principio), por esto se genera otro state (debounced)
  y cuando se cambia term y pasa el tiempo adecuado se lo pasa a debounced y ese hace el get de la API
  */

  useEffect(() => {
    const timerId = setTimeout(() => {
     setDebouncedTerm(term);
    }, 1000);

    return() =>{
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    //Primera manera, helper function
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };

    if(debouncedTerm) {
    search();
    }
    
  }, [debouncedTerm]);

  const renderResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          {/* not good practice, puede ser peligroso, podemos usar algun DOMpurify  */}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
        <div className="ui celled list">{renderResults}</div>
      </div>
    </div>
  );
};

export default Search;
