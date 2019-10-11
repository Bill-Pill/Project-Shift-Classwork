// var ReviewsCollection = Backbone.Collection.extend({
//   model: ReviewModel,

//   addReview: function (name, text) {
//     this.add({
//       name: name,
//       text: text
//     })
//   }
// });


var ReviewsCollection = Backbone.Collection.extend({
  url: '',
  model: ReviewModel,

  addReview: function (name, text) {
    this.create({
      name: name,
      text: text
    })
  }
});