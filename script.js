const formSubmit = document.querySelector('.submitBtn');
const { forms } = document;
const bookList = document.querySelector('.book-list');
let bookStore = [];

class Book {
  constructor(title, author){
    this.title = title;
    this.author = author;
    this.id = new Date().valueOf();
  }
}








