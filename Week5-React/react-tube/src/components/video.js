import React from 'react';

const Video = props => {
  return (
    <li className="list-group-item video-item">
      <img className="float-left" src={ props.video.snippet.thumbnails.default.url }></img>
      <a className="watch-video" href="#" data-id={props.video.id.videoId}>
        <span>{ props.video.snippet.title }</span>
      </a>
    </li>
  )
}

export default Video;