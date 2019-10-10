var Book = Backbone.Model.extend({
  defaults: function () {
    return {
      title: '',
      author: ''
    }
  }
});

var Books = Backbone.Collection.extend({
  model: Book
});

var BookCase = Backbone.Model.extend({
  defaults: function () {
    return {
      label: '',
      books: new Books()
    };
  }
});

var BookCases = Backbone.Collection.extend({
  model: BookCase
});

var Library = Backbone.Model.extend({
  defaults: function () {
    return {
      name: '',
      bookCases: new BookCases()
    };
  }
});

var library = new Library({
  name: 'Awesome Library'
});


var fiction = new BookCase({
  label: 'fiction'
});
var variablename = new BookCase({
  label: 'history'
});


library.get('bookCases').add(variablename)
library.get('bookCases').add(fiction);

console.log(library);

//library.bookCases.get('history').name


console.log(library.get('bookCases'))