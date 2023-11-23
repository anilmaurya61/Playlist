import React from "react";
import './App.css'

const INITIAL_VIDEO_ITEMS = [
  {
    id: 1,
    title: "video1",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
  {
    id: 2,
    title: "video2",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300, 
  },
  {
    id: 3,
    title: "video3",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
  {
    id: 4,
    title: "video4",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
  {
    id: 5,
    title: "video5",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
  {
    id: 6,
    title: "video6",
    url: "https://youtube.com/v/e9r9349394",
    isMarkedAsCompleted: false,
    length: 300,
  },
];



export default function Playlist() {
  const [videoItems, setVideoItems] = React.useState(INITIAL_VIDEO_ITEMS);
  const [currentVideoId, setCurrentVideoId] = React.useState(3);

  function markCompleted(videoId){

    const updatedVideoItems = videoItems.map((video) =>
      video.id == videoId ? { ...video, isMarkedAsCompleted: true } : video
    );
    setVideoItems(updatedVideoItems);

  };

  function onVideoSelected(videoId) {
    setCurrentVideoId(videoId);
  }

  const currentVideo = videoItems.find(
    (videoItem) => videoItem.id === currentVideoId
  );

  return (
    <div className="playlist">
      <header>
        <h1 className="playlist-heading">Playlist</h1>
      </header>
      <div className="content-container">
        <main>
          <CurrentVideoTitle video={currentVideo} />
          <VideoPlayer video={currentVideo} markCompleted={markCompleted}/>
        </main>
        <Sidebar
          videoItems={videoItems}
          currentVideoId={currentVideoId}
          setCurrentVideoId={onVideoSelected}
        />
      </div>
    </div>
  );
}

function CurrentVideoTitle({ video }) {
  return <div className="current-video-title">{video.title}</div>;
}

function VideoPlayer({ video, markCompleted}) {
  return (
    <div className="video-player-container">
      <div>Video Player</div>
      <div>
        <pre>
          <code>{JSON.stringify(video, null, 4)}</code>
        </pre>
      </div>
      <button onClick={()=> markCompleted(video.id)}>Mark Video As completed</button>
    </div>
  );
}

function Sidebar({ videoItems, currentVideoId, setCurrentVideoId }) {
  return (
    <div className="sidebar">
      <WatchedVideosProgress videoItems={videoItems} currentVideoId={currentVideoId}/>
      <VideoItemList
        videoItems={videoItems}
        currentVideoId={currentVideoId}
        setCurrentVideoId={setCurrentVideoId}
      />
    </div>
  );
}

function WatchedVideosProgress({videoItems, currentVideoId}) {
  let completedCount = videoItems.filter((video)=>video.isMarkedAsCompleted == true).length;
  let currentVideoName = videoItems.find((video) => video.id == currentVideoId)
  return <div className="watched-videos-progress">{`Watched video Progress ${completedCount}/${videoItems.length}`}</div>;
}

function VideoItemList({ videoItems, currentVideoId, setCurrentVideoId }) {
  return (
    <div className="video-item-list">
      <ul>
        {videoItems.map((item) => {
          let activeClassName = item.id === currentVideoId ? "active-item" : "";
          function handleClick() {
            setCurrentVideoId(item.id);
          }
          return (
            <li
              key={item.id}
              className={`${activeClassName}`}
              onClick={handleClick}
            >
              {item.isMarkedAsCompleted ? item.title+ "✅" : item.title }
            </li>
          );
        })}
      </ul>
    </div>
  );
}