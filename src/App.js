import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route} from 'react-router-dom';
import BookShelves from './BookShelves';
import Search from './Search';

class MyReadsApp extends Component {

  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books: books});
    });
  };

  changeBookShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then( _ => {
      this.setState({
        books: this.state.books.filter( (b) => b.id !== book.id).concat([book])
      });
    });
  };

  render() {
    const shelves = [
      {id: 'currentlyReading', title: 'Currently Reading'},
      {id: 'wantToRead', title: 'Want to Read'},
      {id: 'read', title: 'Read'}
    ];
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves
            shelves={shelves}
            books={this.state.books}
            onChangeBookShelf={this.changeBookShelf}
          />
        )}
        />
        <Route path="/search" render={() => (
          <Search
            shelfBooks={this.state.books}
            onChangeBookShelf={this.changeBookShelf}
          />
        )}
        />
      </div>
    )
  }

}

export default MyReadsApp;
