var Library = function(){
  var books = [];

  var addBook = function(book) {
    books.push(book)
  }

  var checkOutBook = function(book) {
    
  }

  return { 
    addBook:addBook,
    checkOutBook:checkOutBook
             }
}

var Book = function(title, author){
  var attributes = {
    title : title,
    author : author
  };
  var getAttribute = function(attribute) {
    if (attributes[attribute]) {
      return attributes[attribute];
    }
    else return false;
  }
   return ({getAttribute : getAttribute})
}
