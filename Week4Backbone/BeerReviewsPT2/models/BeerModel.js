var BeerModel = Backbone.Model.extend({
  defaults: function () {
    return {
      id: null,
      name: '',
      style: '',
      image_url: '',
      abv: null,
      reviews: new ReviewsCollection()
    }
  }
});