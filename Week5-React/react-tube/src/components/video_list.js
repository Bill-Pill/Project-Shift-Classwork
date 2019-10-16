import React from 'react';
import Video from './video';


const VideoList = props => {
  const videoItems = props.videos.map((video, index) => {
    return (
      <Video key={index} video={video} />
    )
  })
  return (
  <ul className="col-md-4 list-group">
    {videoItems}
  </ul>
  )
};

export default VideoList;