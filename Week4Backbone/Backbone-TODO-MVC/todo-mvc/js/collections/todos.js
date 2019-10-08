var TodosCollection = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: TodoModel,
  createTodo: function (title) {
    this.add({
      title: title,
      completed: false
    });
  }
});