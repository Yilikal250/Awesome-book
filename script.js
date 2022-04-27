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

//Ui class - handle ui tasks
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

  static displayBooks(){
    const books =  localStorage.getItem('books');
    if(books){
      bookStore = JSON.parse(books);
      bookStore.forEach(book => UserInterface.updateBrowser(book));
    }else{
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






