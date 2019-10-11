var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click .submit-beer': 'createBeer',
    'click .view-beer': 'viewBeer',
    'click .back': 'showMainBeers',
    'click .submit-review': 'createReview'
  },

  initialize: function () {
    this.$nameInput = this.$('#name-input');
    this.$styleInput = this.$('#style-input');
    this.$abvInput = this.$('#abv-input');
    this.$imgUrl = this.$('#img-input');

    this.$beerList = this.$('.beer-list');

    this.listenTo(this.model.get('beers'), 'add', this.renderBeer);

    this.listenTo(this.model, 'change:show_reviews', this.renderPage);
    this.renderBeers();
    this.detailView = null;

    this.listenTo(this.model, 'change:current_beer', this.renderDetailView);
  },

  renderPage: function () {
    this.$('.reviews-container').toggleClass('show', this.model.get('show_reviews'));
    this.$('.beers-container').toggleClass('show', !this.model.get('show_reviews'));
  },

  ////////////////////////////////
  // WORK IN PROGRESS - THIS BELONDS IN BEER DETAIL REVIEWf
  ///////////////////////////////
  createReview: function () {
    var nameText = this.$('#review-name-input').val()
    var reviewText = this.$('review-notes-input').val()
    debugger;

  },

  createBeer: function () {
    this.model.get('beers').add({
      name: this.$nameInput.val(),
      style: this.$styleInput.val(),
      abv: this.$abvInput.val(),
      image_url: this.$imgUrl.val()
    });
  },

  renderBeer: function (beer) {
    var beerView = new BeerView({
      model: beer
    });
    this.$('.beer-list').append(beerView.render().el);
  },

  renderBeers: function () {
    this.model.get('beers').each(function (m) {
      this.renderBeer(m);
    }, this);
  },

  showMainBeers: function () {
    this.model.showBeers()
  },

  viewBeer: function (e) {
    var clickedBeerId = $(e.currentTarget).data().id;

    this.model.showReviews(clickedBeerId);
  },

  renderDetailView: function () {
    if (this.detailView) {
      this.detailView.remove();
    }

    this.detailView = new BeerDetailView({
      model: this.model.get('current_beer')
    });

    this.$('.reviews-container').append(this.detailView.render().el);
  },

});