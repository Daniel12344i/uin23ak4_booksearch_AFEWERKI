const fetchBooks = async (query) => {
  try {
    if (!query) return []; // Returnerer et tomt array hvis søkeordet er tomt for å unngå feil

    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`API-kall feilet med status: ${response.status}`);
    }

    const data = await response.json();
    return data.docs.map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name[0] : "Ukjent forfatter",
      publishYear: book.first_publish_year,
      isbn: book.isbn ? book.isbn[0] : undefined,
      averageRating: book.ratingValue,
    }));
  } catch (error) {
    console.error("Det oppstod en feil under henting av bøker:", error);
    return [];
  }
};

export { fetchBooks };
