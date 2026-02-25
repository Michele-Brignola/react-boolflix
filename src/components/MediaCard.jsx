const languageToFlag = {
  en: "🇺🇸", it: "🇮🇹", fr: "🇫🇷", de: "🇩🇪", es: "🇪🇸",
  ja: "🇯🇵", ko: "🇰🇷", zh: "🇨🇳", pt: "🇵🇹", ru: "🇷🇺",
};

export default function MediaCard({ data }) {
  const isMovie = data.type === "movie";
  const title = isMovie ? data.title : data.name;
  const originalTitle = isMovie ? data.original_title : data.original_name;
  const date = isMovie ? data.release_date : data.first_air_date;
  const flag = languageToFlag[data.original_language] || "🏳️";

  return (
    <div className="col py-3">
      <div className="card h-100" style={{ width: "18rem" }}>
        {data.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            className="card-img-top"
            alt={title}
          />
        )}
        <div className="card-body">
          <span className={`badge ${isMovie ? "bg-primary" : "bg-success"} mb-2`}>
            {isMovie ? "🎬 Film" : "📺 Serie TV"}
          </span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted">{originalTitle}</p>
          <p className="card-text">Lingua: {flag} {data.original_language.toUpperCase()}</p>
          <p className="card-text">Data di uscita: {date}</p>
          <p className="card-text">Voto: {data.vote_average?.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}