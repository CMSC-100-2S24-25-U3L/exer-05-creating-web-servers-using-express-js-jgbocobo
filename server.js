import express from "express";
import fs from 'fs';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

function validate(x){
    if (typeof(x)==='string' && x!="");
    return true
}

app.post("/add-book", (req, res) => {
    var bookDetails = [];
    var bookName = req.body.bookName; 
    var isbn = req.body.isbn; 
    var author = req.body.author; 
    var yearPublished = req.body.yearPublished; 
    var success = true;

    bookDetails[0] = bookName;
    bookDetails[1] = isbn;
    bookDetails[2] = author;
    bookDetails[3] = yearPublished;

    for(let i=0;i<3;i++){
        if(validate(bookDetails[i])===true){
            success=true
        }else{
            success=false
        }
    }

    if(success===true){
        console.log("{ success: true }")
        var books = bookDetails.join(",");
        fs.appendFileSync("books.txt", books + "\n"); 
        res.send(success);
    }else{
        
        console.log("{ success: false }")
        success.success = false;
        res.send(success);
        return false;
    }
    
});

app.get("/find-by-author", (req, res) => {
    const { author } = req.query;
  
    if (!author) {
      return res.send("<h1>Invalid Author</h1><p>Please provide a valid Author.</p>");
    }
  
    // Read the books from books.txt
    fs.readFile("books.txt", "utf8", (err, data) => {
      if (err) {
        return res.send("<h1>No books yet</h1>");
      }
  
      // Parse the data into individual books
      const books = data.split("\n").map((line) => {
        const [bookName, isbn, authorName, yearPublished] = line.split(",");
        return { bookName, isbn, author: authorName, yearPublished };
      });
  
      // Search the books array for a match
      const foundBooks = books.filter((book) => book.author === author);
  
      if (foundBooks.length > 0) {
        let result = "<h1>Books Found</h1>";
        foundBooks.forEach((book) => {
          result += `
            <p><strong>Book Name:</strong> ${book.bookName}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year Published:</strong> ${book.yearPublished}</p>
            <hr />
          `;
        });
        return res.send(result);
      }
  
    });
  });

app.get("/find-by-isbn-author", (req, res) => {
  const { isbn, author } = req.query;

  // Check if either ISBN or author is provided
  if (!isbn && !author) {
    return res.send("<h1>Invalid Request</h1><p>Please provide either ISBN or Author to search.</p>");
  }

  // Read the books from books.txt
  fs.readFile("books.txt", "utf8", (err, data) => {
    if (err) {
      return res.send("<h1>No books yet</h1>");
    }

    // Parse the data into individual books
    const books = data.split("\n").map((line) => {
      const [bookName, isbn, authorName, yearPublished] = line.split(",");
      return { bookName, isbn, author: authorName, yearPublished };
    });

    // Filter the books based on ISBN and/or author
    const foundBooks = books.filter((book) => {
      const isIsbnMatch = isbn ? book.isbn === isbn : true;
      const isAuthorMatch = author ? book.author === author : true;
      return isIsbnMatch && isAuthorMatch;
    });

    // If books are found, return the results
    if (foundBooks.length > 0) {
      let result = "<h1>Books Found</h1>";
      foundBooks.forEach((book) => {
        result += `
          <p><strong>Book Name:</strong> ${book.bookName}</p>
          <p><strong>ISBN:</strong> ${book.isbn}</p>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Year Published:</strong> ${book.yearPublished}</p>
          <hr />
        `;
      });
      return res.send(result);
    }

    // If no books are found
    res.send("<h1>Book Not Found</h1><p>No books found with the provided ISBN and Author.</p>");
  });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});