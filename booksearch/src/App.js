import React, { useState, useEffect } from "react";
import SearchResults from "./Components/SearchResults/SearchResults";
import { fetchBooks } from "./Services/api";
import "./App.scss";

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Funksjon for å hente James Bond-bøker
  const fetchJamesBondBooks = () => {
    setIsLoading(true);
    // Antar at fetchBooks kan ta en parameter som spesifiserer søk etter James Bond-bøker
    // Eller du må kanskje justere denne kallet til å passe din implementasjon
    fetchBooks("James Bond")
      .then((booksFromApi) => {
        setBooks(booksFromApi);
        setError("");
      })
      .catch((err) => {
        console.error("Fetching James Bond books failed:", err);
        setError("An error occurred while fetching data.");
        setBooks([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Kjør fetchJamesBondBooks når komponenten mounts
  useEffect(() => {
    fetchJamesBondBooks();
  }, []);

  const handleSearch = () => {
    if (query.length >= 3) {
      setIsLoading(true);
      fetchBooks(query)
        .then((booksFromApi) => {
          setBooks(booksFromApi);
          setError("");
        })
        .catch((err) => {
          console.error("Fetching books failed:", err);
          setError("An error occurred while fetching data.");
          setBooks([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError("Søket må inneholde minst tre tegn.");
      setBooks([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BookHeaven</h1>
        <div className="search-container">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="search-button"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {isLoading && <p className="text-light bg-dark">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
      </header>
      <main>
        <SearchResults books={books} error={error} />
      </main>
    </div>
  );
}

export default App;
