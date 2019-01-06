import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = (props) => {

  const {shelf, books, onChangeBookShelf} = props;

  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                onChangeBookShelf={onChangeBookShelf}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired
}

export default BookShelf;
