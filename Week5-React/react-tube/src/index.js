import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';
import './App.css'
const API_KEY = 'AIzaSyAXguV_Fvs9UAdppg6a0DcS1XD2QZ_BVhk';
const axios = require('axios');

class App extends Component {
  constructor() {
    super();

    this.state = {
      videos: [],
      selectedVideo: null
    };

  }

  videoSearch = (term) => {
    const url = 'https://www.googleapis.com/youtube/v3/search';

    const params = {
      part: 'snippet',
      key: API_KEY,
      q: term,
      type: 'video'
    };

    axios.get(url, { params: params })
      .then(response => {
        this.setState({
          videos: response.data.items,
          selectedVideo: response.data.items[0]
        });
        console.log(this.state.selectedVideo)
      })
      .catch(error => {
        console.error(error);
      });
  }

  render () {
    return (
      <div>
        <SearchBar onSearchTermChange={this.videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList videos={this.state.videos} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));