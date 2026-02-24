import { useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

const languageToFlag = {
  en: "🇺🇸",
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  ja: "🇯🇵",
  ko: "🇰🇷",
  zh: "🇨🇳",
  pt: "🇵🇹",
  ru: "🇷🇺",
};


export default function App() {
  const [listaFilm, setListaFilm] = useState([]);
  const [query, setQuery] = useState("");
  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
  
  const getFlag = (languageCode) => {
    return languageToFlag[languageCode] || "🏳️";
  };
  
  const HandleSubmit = (e) => {
    const filmApi = "https://api.themoviedb.org/3/search/movie";
    e.preventDefault();
    axios
      .get(filmApi, {
        params: {
          api_key: TMDB_API_KEY,
          query: query,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setListaFilm(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container py-3">
      <h1>Boolflix</h1>
      <form onSubmit={HandleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Ricerca
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="row row-cols-4">
        {listaFilm.length > 0 ? (
          listaFilm.map((data, id) => (
            <div key={id} className="col py-3">
              <div className="card h-100" style={{ width: "18rem" }}>
                <img
                  src={data.poster_path}
                  className="card-img-top"
                  alt="..."></img>
                <div className="card-body">
                  <h5 className="card-title">{data.original_title}</h5>
                  <p className="card-text">
                    Lingua originale: {getFlag(data.original_language)}
                    {data.original_language}
                  </p>
                  <p className="card-text">
                    Data di uscita: {data.release_date}
                  </p>
                  <p className="card-text">Voto: {data.vote_average}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="py-3">I Film appariranno qui</p>
        )}
      </div>
    </div>
  );
}
