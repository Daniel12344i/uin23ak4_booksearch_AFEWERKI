import React from "react";
import BookCard from "../BookCard/BookCard";
import "./SearchResults.scss";

function SearchResults({ books, error }) {
  if (error) {
    return <p className="error-message">{error}</p>; // Display the error message
  }

  return (
    <div className="search-results">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default SearchResults;
