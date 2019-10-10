// The DOM element for a todo item...
TodoView = Backbone.View.extend({

  events: {
    'click .toggle': 'toggleComplete',
    'click .destroy': 'removeOnClick'
  },

  toggleComplete: function () {
    this.model.toggle()
  },

  removeOnClick: function () {
    this.remove();
  },


  //... is a list tag.
  tagName: 'li',

  // Cache the template function for a single item.
  template: Handlebars.compile($('#item-template').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
});