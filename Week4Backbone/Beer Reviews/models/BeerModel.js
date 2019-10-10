
  var TodoModel = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    }
  });

  var BeerModel = Backbone.Model.extend({
    defaults: {
      name: '',
      style: '',
      abv: 0,
      image_url: ''
    }
  });

  