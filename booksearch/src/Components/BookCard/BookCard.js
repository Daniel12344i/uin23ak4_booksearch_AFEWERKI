import React, { useState } from "react";
import "./BookCard.scss";

function BookCard({ book }) {
  const placeholderImageUrl =
    "https://via.placeholder.com/400x400?text=No+Cover+Available";
  const [imgSrc, setImgSrc] = useState(
    book.isbn
      ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
      : placeholderImageUrl
  );

  const handleImgError = () => {
    setImgSrc(placeholderImageUrl);
  };

  return (
    <div className="book-card">
      <img
        src={imgSrc}
        alt={`Cover of ${book.title}`}
        className="book-cover"
        onError={handleImgError}
      />
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Year: {book.publishYear}</p>
      {book.averageRating && <p>Average Rating: {book.averageRating}</p>}
      {book.isbn && (
        <a
          href={`https://www.amazon.com/s?k=${book.isbn}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Amazon
        </a>
      )}
    </div>
  );
}

export default BookCard;
