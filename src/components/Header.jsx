export default function Header({ query, setQuery, onSubmit }) {
  return (
    <header className="bg-dark py-3 mb-4">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="text-danger m-0">Boolflix</h1>
        <form onSubmit={onSubmit} className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Cerca un film o una serie TV"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-danger">
            Cerca
          </button>
        </form>
      </div>
    </header>
  );
}