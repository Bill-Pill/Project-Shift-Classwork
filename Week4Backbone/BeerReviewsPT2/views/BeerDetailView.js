var BeerDetailView = Backbone.View.extend({
  className: 'reviews-container-inner',

  template: Handlebars.compile($('#beer-detail-template').html()),


  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    this.renderReviews();

    return this;
  },

  renderReviews: function () {
    this.model.get('reviews').each(function (m) {
      this.renderReview(m);
    }, this);
  },

  renderReview: function (review) {
    var reviewView = new ReviewView({
      model: review
    });
    this.$('.reviews-list').append(reviewView.render().el);
  },
});