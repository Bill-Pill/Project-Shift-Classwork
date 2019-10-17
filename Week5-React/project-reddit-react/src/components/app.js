import React, { Component } from 'react';
import PostForm from './post-form';
import PostsList from './posts-list';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  constructor () {
    super()

    this.state = {
      posts: [
        { user: 'Aaron', text: 'I like chocolate', upvotes: 5 },
        { user: 'Aaron', text: 'I like cheese', upvotes: 3 }
      ],
      showPosts: true
    }

    this.addPost = this.addPost.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.upvotePost = this.upvotePost.bind(this);
  }

  addPost (post) {
    this.setState({ posts: this.state.posts.concat([post]) });
  }

  upvotePost (post) {
    const postsWithUpvotes = this.state.posts.map((p) => {
      const upvotes = post.upvotes + 1;

      if (p.text === post.text) {
        return Object.assign(post, p, {upvotes})
      } else {
        return p;
      }
    });

    this.setState({ posts: postsWithUpvotes })
  }

  handleClick () {
    this.setState({ showPosts: !this.state.showPosts });
  }

  render() {
    const showPosts = () => {
      if (this.state.showPosts) {
        return <PostsList upvotePost={this.upvotePost} posts={this.state.posts} />
      }
    }

    const renderText = () => {
      if (this.state.showPosts) {
        return 'Hide Posts';
      } else {
        return 'Show Posts'
      }
    }


    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="page-header">
            <h1>Project Reddit</h1>
          </div>

          <button onClick={this.handleClick}>{ renderText() }</button>
          
          { showPosts() }

          <PostForm addPost={this.addPost} />
        </div>
      </div>
    );
  }
}

export default App;
