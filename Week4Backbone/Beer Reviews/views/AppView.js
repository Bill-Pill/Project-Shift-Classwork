var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click .submit-beer': 'createBeer'
  },

  initialize: function () {
    this.listenTo(this.model.get('beers'), 'add', this.renderBeer);
    this.listenTo(this.model.get('beers'), 'change', this.renderBeers);
    this.listenTo(this.model.get('beers'), 'destroy', this.renderBeers);
    this.renderBeers();
  },

  createBeer: function () {
    this.model.get('beers').addBeer(
      this.$('#name-input').val(),
      this.$('#style-input').val(),
      this.$('#abv-input').val(),
      this.$('#img-input').val()
    );
  },

  renderBeer: function (beer) {
    var view = new BeerView({
      model: beer
    });
    this.$('.beer-list').append(view.render().el);
  },

  renderBeers: function () {
    this.$('.beer-list').empty()
    this.model.get('beers').each(function (m) {
      this.renderBeer(m);
    }, this);
  }

});