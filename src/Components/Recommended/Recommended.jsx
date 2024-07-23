/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Recommended.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { Link } from "react-router-dom";
const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const related_video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        const response = await fetch(related_video_url);
        const fetchedData = await response.json();

        // Handle potential empty data
        const videos = fetchedData.items || [];
        setApiData(videos);
      } catch (error) {
        console.error("Error fetching related videos:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch/error
      }
    };

    fetchData();
  }, [categoryId]);
  return (
    <div className="recommended">
      {isLoading ? (
        <p>Loading related videos...</p>
      ) : apiData.length === 0 ? (
        <p>No related videos found.</p>
      ) : (
        apiData.map((item, index) => (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="side-video-list"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />{" "}
            {/* Set meaningful alt text */}
            <div className="vid-info">
              <h4>{item.snippet.title}</h4> {/* Use title from API data */}
              <p>{item.snippet.channelTitle}</p>
              <p>
                {value_converter(item.statistics?.viewCount || "0")} views
                &bull;{" "}
                {moment(item.snippet.publishedAt?.slice(0, 10)).fromNow()}{" "}
                {/* Format date */}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Recommended;
