/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
const Playvideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    const fetchVideoData = async () => {
      //Fetching video data
      const video_channel = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      await fetch(video_channel)
        .then((res) => res.json())
        .then((data) => setApiData(data.items[0]));
    };

    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    const otherVideo = async () => {
      const video_channel = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      await fetch(video_channel)
        .then((res) => res.json())
        .then((data) => setVideoData(data.items[0]));
    };
    otherVideo();
  }, [apiData]);
  useEffect(() => {
    const commentDetail = async () => {
      try {
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        const response = await fetch(comment_url);
        const fetchedData = await response.json();

        // Handle potential empty data
        const comments = fetchedData.items || [];
        setCommentData(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    commentDetail();
  }, [videoId]);
  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16k"}
          Views &bull;
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "16k"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : "165"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={videoData ? videoData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Wing-React"}</p>
          <span>
            {videoData
              ? value_converter(videoData.statistics.subscriberCount)
              : ""}
          </span>
          <span> Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description : "description"}</p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 140}{" "}
          Comment
        </h4>
        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                  <span>
                    {moment(
                      item.snippet.topLevelComment.snippet.publishedAt
                    ).fromNow()}
                  </span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playvideo;
