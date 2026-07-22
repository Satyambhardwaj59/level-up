
// Book Class

class Book {

    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this._price = price;
    }

    // Getter
    get price() {
        return this._price;
    }

    // Setter
    set price(newPrice) {

        if (newPrice > 0) {
            this._price = newPrice;
        } else {
            console.log("Price must be greater than 0");
        }

    }

    displayBook() {
        console.log(`
Title : ${this.title}
Author : ${this.author}
Price : ₹${this.price}
        `);
    }

    // Static Method
    static libraryInfo() {
        console.log("Welcome to JavaScript Library Management System");
    }

}

// Prototype Method

Book.prototype.discount = function (percentage) {

    const discountedPrice =
        this.price - (this.price * percentage / 100);

    console.log(
        `${this.title} after ${percentage}% discount = ₹${discountedPrice}`
    );

};

// EBook Class (Inheritance)

class EBook extends Book {

    constructor(title, author, price, fileSize) {

        super(title, author, price);

        this.fileSize = fileSize;

    }

    // Method Overriding
    displayBook() {

        console.log(`
E-Book

Title : ${this.title}
Author : ${this.author}
Price : ₹${this.price}
File Size : ${this.fileSize} MB
        `);

    }

}

// Library Class

class Library {

    constructor() {
        this.books = [];
    }

    // Add Book
    addBook(book) {

        this.books.push(book);

        console.log(`${book.title} Added Successfully`);

    }

    // Remove Book
    removeBook(title) {

        this.books = this.books.filter(
            (book) => book.title !== title
        );

        console.log(`${title} Removed`);

    }

    // Display Books
    displayBooks() {

        console.log("\n===== Library Books =====");

        this.books.forEach((book) => {

            book.displayBook();

        });

    }

}

// Static Method

Book.libraryInfo();

// Create Objects

const book1 = new Book(
    "JavaScript",
    "Akshay Saini",
    700
);

const book2 = new Book(
    "React",
    "Jordan Walke",
    900
);

const ebook1 = new EBook(
    "Node.js",
    "Ryan Dahl",
    1200,
    15
);

// Getter & Setter

console.log(book1.price);

book1.price = 800;

console.log(book1.price);

// Prototype Method

book1.discount(10);


// Library


const library = new Library();

library.addBook(book1);

library.addBook(book2);

library.addBook(ebook1);

library.displayBooks();

library.removeBook("React");

library.displayBooks();


// instanceof


console.log(book1 instanceof Book);

console.log(book1 instanceof Library);

console.log(ebook1 instanceof EBook);

console.log(ebook1 instanceof Book);


// Object.create()


const anotherBook = Object.create(book1);

anotherBook.title = "MongoDB";

anotherBook.author = "MongoDB Team";

anotherBook.price = 600;

anotherBook.displayBook();