import React, { Component } from 'react';
import PostForm from './post-form';
import PostsList from './posts-list';
import { NONAME } from 'dns';

class App extends Component {
  constructor () {
    super()

    this.state = {
      posts: [],
      postsHidden: false,
      postButtonText: "Hide Posts",
      displayClass: "display-none"
    }

    this.addPost = this.addPost.bind(this)
  }

  addPost (post) {
    this.setState({posts: this.state.posts.concat([post])});
  }

  togglePosts = () => {
    this.setState({postsHidden: !(this.state.postsHidden)})
    if (this.state.postsHidden) {
      this.setState({postButtonText: "Show Posts"})
    }
    else {
      this.setState({postButtonText: "Hide Posts"})
    }
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="page-header">
            <h1>Project Reddit</h1>
          </div>

          
          <div className="d-none">
          <PostsList posts={this.state.posts} />
          </div>

          <button onClick={this.togglePosts} type="button" className="btn btn-info">{ this.state.postButtonText }</button>

          <PostForm addPost={this.addPost} />
        </div>
      </div>
    );
  }
}

export default App;