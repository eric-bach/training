import "./VideoItem.css";
import React from "react";

// De-structure props.video to video
const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <div onClick={() => onVideoSelect(video)} className="video-item item">
      <img
        alt={video.snippet.title}
        src={video.snippet.thumbnails.medium.url}
        className="ui image"
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
