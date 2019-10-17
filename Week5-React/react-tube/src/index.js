import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { onUpdate, forceUpdate, sendEvent } from './state';
const API_KEY = 'AIzaSyAXguV_Fvs9UAdppg6a0DcS1XD2QZ_BVhk';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);

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
        const newVideos = response.data.items;
        const newSelectedVideo = response.data.items[0];
        sendEvent('changeVideoList', newVideos)
        sendEvent('changeSelectedVideo', newSelectedVideo)
      })
      .catch(error => {
        console.error(error);
      });
  }

  render () {
    return (
      <div>
        <SearchBar onSearchTermChange={this.videoSearch} />
        <VideoDetail video={this.props.selectedVideo} />
        <VideoList videos={this.props.videos} />
      </div>
    )
  }
}
onUpdate((state) => {
  ReactDOM.render(<App />, document.getElementById('root'));
})

forceUpdate();