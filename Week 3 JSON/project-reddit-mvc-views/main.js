var ProjectReddit = function () {
  var posts = Collection();

  var $posts = $('.posts');

  var createPost = function (text, user) {
    var commentCollection = Collection();

    commentCollection.change(function () {
      app.renderComments();
    });

    var postModel = Model({
      text: text,
      name: user,
      comments: commentCollection
    });

    postModel.change(function () {
      app.renderPosts();
    });

    posts.add(postModel);
  };

  // Empty all the posts, then add them from the posts array along with our
  // new comments HTML
  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.models.length; i += 1) {
      var postModel = posts.models[i];

      var postTemplate = Handlebars.compile($('#post-template').html());

      var postView = View(postModel, postTemplate);

      $posts.append(postView.render());
    }
  }

  var renderComments = function () {
    $('.comments-list').empty();

    for (var i = 0; i < posts.models.length; i += 1) {
      // the current post in the iteration
      var postModel = posts.models[i];

      // finding the "post" element in the page that is equal to the
      // current post we're iterating on
      var $post = $('.posts').find('.post').eq(i);

      // iterate through each comment in our post's comments array
      for (var j = 0; j < postModel.get('comments').models.length; j += 1) {
        // the current comment in the iteration
        var commentModel = postModel.get('comments').models[j];

        var postTemplate = Handlebars.compile($('#comment-template').html());

        var commentView = View(commentModel, postTemplate);

        $post.find('.comments-list').append(commentView.render())
      };
    };
  };

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');

    var index = $clickedPost.index();

    posts.remove(index);

    $clickedPost.remove();
  };

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  };

  var createComment = function (text, name, postIndex) {
    var commentModel = Model({
      text: text,
      name: name
    });

    var currentComments = posts.models[postIndex].get('comments');

    currentComments.add(commentModel);
  };

  var removeComment = function (commentButton) {
    // the comment element that we're wanting to remove
    var $clickedComment = $(commentButton).closest('.comment');

    // index of the comment element on the page
    var commentIndex = $clickedComment.index();

    // index of the post in the posts div that the comment belongs to
    var postIndex = $clickedComment.closest('.post').index();

    // removing the comment from the page
    $clickedComment.remove();

    // remove the comment from the comments array on the correct post object
    posts.models[postIndex].get('comments').remove(commentIndex);
  };

  return {
    posts: posts,
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    createComment: createComment,
    renderComments: renderComments,
    removeComment: removeComment,
    toggleComments: toggleComments
  };
};

var app = ProjectReddit();

app.posts.change(function () {
  app.renderPosts();
  app.renderComments();
});

app.renderPosts();
app.renderComments();

// Events
$('.add-post').on('click', function (e) {
  e.preventDefault();

  var text = $('#post-name').val();
  var user = $('#post-user').val();
  app.createPost(text, user);
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  var text = $(this).siblings('.comment-name').val();
  var name = $(this).siblings('.comment-user').val();

  // finding the index of the post in the page... will use it in #createComment
  var postIndex = $(this).closest('.post').index();

  app.createComment(text, name, postIndex);
});

$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);
});