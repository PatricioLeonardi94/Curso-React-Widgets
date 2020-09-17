import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    //Primera manera, helper function
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
    //para no correrlo todo el tiempo esperamos que deje de tipear por 500 miliseconds
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);

      //el return se ejecuta cuando se hace un rerender y no en la primera vez.
      // Esto permite que cancelemos el timeout previo hasta q se deje de escribir
      return () => {
        clearTimeout(timeoutId);
      };
    }

    //Segunda manera, promise
    /*(async () =>{
        await axios.get();
        })();   */
  }, [term]);

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
