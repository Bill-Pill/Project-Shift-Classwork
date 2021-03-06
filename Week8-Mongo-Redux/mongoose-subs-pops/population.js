const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/populationEx');

const reviewSchema = new Schema({
  reviewText: String,
  book: {
    type: Schema.Types.ObjectId,
    ref: 'book'
  },
  critic: {
    type: Schema.Types.ObjectId,
    ref: 'critic'
  }
});

const Review = mongoose.model('review', reviewSchema);

const criticSchema = new Schema({
  name: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'review'
  }]
});

const Critic = mongoose.model('critic', criticSchema);

const bookSchema = new Schema({
  title: String,
  author: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'review'
  }]
});

const Book = mongoose.model('book', bookSchema);

Book.findOne({
    title: 'Book 1'
  })
  .populate('reviews')
  .exec((err, book) => {
    console.log(book);
  });

let critic1 = new Critic({
  name: 'Critic 1',
  reviews: []
});

let book1 = new Book({
  title: 'Book 1',
  author: 'Author 1',
  reviews: []
});

let review = new Review({
  book: book1._id,
  critic: critic1._id,
  reviewText: 'Excellent Book'
});

review.save();
book1.reviews.push(review);
critic1.reviews.push(review);
book1.save();
critic1.save();