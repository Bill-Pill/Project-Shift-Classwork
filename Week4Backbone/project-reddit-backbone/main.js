var PostModel = Backbone.Model.extend({
  defaults: function () {
    return {
      user: '',
      text: ''
    }
  }
});

var PostView = Backbone.View.extend({
  template: Handlebars.compile($('#post-template').html()),

  className: 'post',

  render: function () {
    this.$el.html(this.template(this.model.attributes));

    return this;
  }
});

$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  var user = $('#post-user').val();

  var postModel = new PostModel({
    text: text,
    user: user
  });
  var postView = new PostView({
    model: postModel
  });

  $('.posts').append(postView.render().el)
});