import { useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

import Header from "./components/Header";
import MediaCard from "./components/MediaCard";

export default function App() {
  const [listaMedia, setListaMedia] = useState([]);
  const [query, setQuery] = useState("");
  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseApi = "https://api.themoviedb.org/3/search";

    Promise.all([
      axios.get(baseApi + "/movie", { params: { api_key: TMDB_API_KEY, query } }),
      axios.get(baseApi + "/tv", { params: { api_key: TMDB_API_KEY, query } }),
    ])
      .then(([filmResponse, tvResponse]) => {
        const films = filmResponse.data.results.map((item) => ({ ...item, type: "movie" }));
        const tvShows = tvResponse.data.results.map((item) => ({ ...item, type: "tv" }));
        setListaMedia([...films, ...tvShows]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header query={query} setQuery={setQuery} onSubmit={handleSubmit} />
      <div className="container py-3">
        <div className="row row-cols-4">
          {listaMedia.length > 0 ? (
            listaMedia.map((data) => (
              <MediaCard key={`${data.type}-${data.id}`} data={data} />
            ))
          ) : (
            <p className="py-3">I Film e le Serie TV appariranno qui</p>
          )}
        </div>
      </div>
    </>
  );
}