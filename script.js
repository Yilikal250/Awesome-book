const formSubmit = document.querySelector('.submitBtn');
const forms = document.forms;
const bookList = document.querySelector('.book-list');
let bookStore = [];


// add books to the bookStore array as an object
function addBook(bookTitle, bookAuthor) {
  if(bookTitle === '' || bookAuthor === '') {
    console.log('Fill in all fields')
  }else {
    const book = {
      title: bookTitle,
      writter: bookAuthor,
      id: new Date().valueOf()
    }
    bookStore.push(book);
    localStorage.setItem('books', JSON.stringify(bookStore));
    // add book to browser
    UpdateBrowser(book)
  }
}

// add books to the broswer
function UpdateBrowser(book) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book-holder');
  // add book title
  const titleP = document.createElement('p');
  titleP.textContent = book.title;
  // add author
  const authorP = document.createElement('p');
  authorP.textContent = book.writter;
  // add hidden id field
  const id = document.createElement('p');
  id.setAttribute('type','hidden');
  id.setAttribute('value', book.id)
  //  create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remove';
  deleteBtn.classList.add('deleteBtn');
  const line = document.createElement('hr');
  
  bookDiv.appendChild(titleP);
  bookDiv.appendChild(authorP);
  bookDiv.appendChild(id);
  bookDiv.appendChild(deleteBtn);
  bookDiv.appendChild(line);
  bookList.appendChild(bookDiv);
}

formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const form = forms['book-form'];
  const fields = form.elements;
  const bookTitle = fields['title'].value;
  const bookAuthor = fields['author'].value;
  //clear form fields
  fields['title'].value = '';
  fields['author'].value = '';
  // add book to bookStore
  addBook(bookTitle, bookAuthor);
});