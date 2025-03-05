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




const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
