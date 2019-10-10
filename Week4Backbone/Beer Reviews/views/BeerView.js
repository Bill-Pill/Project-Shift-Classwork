BeerView = Backbone.View.extend({
  className: 'beer',

  events: {
    'click .edit': 'editSelectedBeer',
    'keypress .edit-mode': 'updateOnEnter',
    'click .remove': 'removeSelectedBeer'
  },

  removeSelectedBeer: function () {
    this.model.destroy()
  },

  editSelectedBeer: function () {
    this.$el.addClass('editing');
    this.$('input').focus();
  },

  updateOnEnter: function (e) {
    if (e.which === 13) {
      this.close()
    }
  },

  close: function () {
    var beerName = this.$('input').val()
    debugger;
    this.model.set({
      "name": beerName
    })
    this.$el.removeClass('editing')
  },

  template: Handlebars.compile($('#beer-template').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }













});