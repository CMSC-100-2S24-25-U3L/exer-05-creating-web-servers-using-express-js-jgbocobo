import needle from "needle";

needle.post(
    "http://localhost:3000/add-book",
    {
        bookName: "Harry Potter and the Chamber of Secrets", 
        isbn: "978-0-7475-3269-9", 
        author: "J.K Rowling", 
        yearPublished: "1998"
    },
    (err, res) => {
        console.log(res.body);
    }
);

needle.post(
    "http://localhost:3000/add-book",
    {
        bookName: "Harry Potter and the Prisoner of Azkaban", 
        isbn: "978-0-7475-4215-5", 
        author: "J.K Rowling", 
        yearPublished: "1999"
    },
    (err, res) => {
        console.log(res.body);
    }
);

needle.post(
    "http://localhost:3000/add-book",
    {
        bookName: "Harry Potter and the Goblet of Fire", 
        isbn: "978-0-7475-4628-3", 
        author: "J.K Rowling", 
        yearPublished: "2000"
    },
    (err, res) => {
        console.log(res.body);
    }
);

