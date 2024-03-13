const myLibrary = [];
const list = document.querySelector('ul');
const newBtn = document.querySelector('#newBtn');
const addBtn = document.querySelector('#addBtn');

function book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function bookCreator(){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    const newBook = new book(title, author, pages, read);
    addToLibrary(newBook);
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;

    display();
}

function addToLibrary(newBook){
    myLibrary.push(newBook)
}

function display(){
    list.innerHTML = '';

    myLibrary.forEach((book, index) => {
        let bookList = document.createElement('li');
        let span = document.createElement('span')
        let delBtn = document.createElement('button');

        if (book.read){
            span.textContent = `${book.title} by ${book.author}, ${book.pages} pages, read.`
        }
        else{
            span.textContent = `${book.title} by ${book.author}, ${book.pages} pages, not read.`
        }
        bookList.appendChild(span);
        bookList.appendChild(delBtn);
        delBtn.textContent = 'Delete';

        delBtn.addEventListener('click', () => {
            list.removeChild(bookList);
            myLibrary.splice(index, 1);
            display();
        });

        list.appendChild(bookList);
    });
}

newBtn.addEventListener('click', () => {
    document.querySelector('#container').hidden = false;
    document.querySelector('#newBtn').hidden = true;

    function clickHandler(){
        document.querySelector('#container').hidden = true;
        document.querySelector('#newBtn').hidden = false;
        bookCreator();
        addBtn.removeEventListener('click', clickHandler);
    }
    addBtn.addEventListener('click', clickHandler);
});

display();