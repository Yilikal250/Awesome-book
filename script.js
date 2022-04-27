const formSubmit = document.querySelector('.submitBtn');
const { forms } = document;
const bookList = document.querySelector('.book-list');
let bookStore = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = new Date().valueOf();
  }
}

// Ui class - handle ui tasks
class UserInterface {
  static updateBrowser(book) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-holder');
    // add book title
    const titleP = document.createElement('p');
    titleP.textContent = book.title;
    // add author
    const authorP = document.createElement('p');
    authorP.textContent = book.author;
    // add hidden id field
    const bookId = document.createElement('p');
    bookId.setAttribute('type', 'hidden');
    bookId.setAttribute('value', book.id);
    //  create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.classList.add('deleteBtn');
    const line = document.createElement('hr');
    bookDiv.appendChild(titleP);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(bookId);
    bookDiv.appendChild(deleteBtn);
    bookDiv.appendChild(line);
    bookList.appendChild(bookDiv);
  }

  static displayBooks() {
    const books = localStorage.getItem('books');
    if (books) {
      bookStore = JSON.parse(books);
      bookStore.forEach((book) => UserInterface.updateBrowser(book));
    } else {
      localStorage.setItem('books', JSON.stringify(bookStore));
    }
  }

  static addBook(book) {
    if (book.title !== '' || book.author !== '') {
      bookStore.push(book);
      localStorage.setItem('books', JSON.stringify(bookStore));
      // add book to browser
      UserInterface.updateBrowser(book);
    }
  }
}

// display books on page load and on refresh
document.addEventListener('DOMContentLoaded', UserInterface.displayBooks());
// Add a book on form submission
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const form = forms['book-form'];
  const fields = form.elements;
  const title = fields.title.value;
  const author = fields.author.value;
  // clear form fields
  fields.title.value = '';
  fields.author.value = '';
  // add book to bookStore
  const book = new Book(title, author);
  UserInterface.addBook(book);
});
// remove element from bookstore on click
bookList.addEventListener('click', (e) => {
  // check if clicked element is delete button
  const targetElement = e.target.classList[0];
  // console.log (targetBook);
  if (targetElement === 'deleteBtn') {
    // get book id
    const bookId = +e.target.parentNode.childNodes[2].getAttribute('value');
    // remove book from browser display
    bookList.removeChild(e.target.parentNode);
    // remove book from bookstore array
    bookStore.forEach((book, index) => {
      if (book.id === bookId) {
        bookStore.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(bookStore));
  }
});
