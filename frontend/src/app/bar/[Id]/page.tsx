"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shop } from '../../../contexts/shopsContext';
import { useParams } from 'next/navigation';
import './bardetails.css';

const BarDetailPage: React.FC = () => {
  const params = useParams();
  const barId = params.Id;

  const [bar, setBar] = useState<Shop | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0); // Initialize likeCount state
  const [dislikeCount, setDislikeCount] = useState<number>(0); // Initialize dislikeCount state
  const [liked, setLiked] = useState<boolean | null>(null); // To track if user liked or disliked
  const [comments, setComments] = useState<string[]>([]); // State to hold comments
  const [newComment, setNewComment] = useState<string>(''); // State for new comment input

  useEffect(() => {
    const fetchBar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shop/get/${barId}`);
        if (response.data.length > 0) {
          const fetchedBar = response.data[0];
          setBar(fetchedBar);
          setLikeCount(fetchedBar.like); // Set initial like count
          setDislikeCount(fetchedBar.dislike); // Set initial dislike count
        } else {
          console.error(`No bar found with id ${barId}`);
        }
      } catch (error) {
        console.error('Error fetching bar details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/comments/get/${barId}`);
        console.log(response.data)
        setComments(response.data.map((el: any) => el.comment)); // Ensure comment_text matches API response
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (barId) {
      fetchBar();
      fetchComments();
    }
  }, [barId]);

  const handleImageClick = (src: string) => {
    setEnlargedImage(src);
  };

  const updateLikeInDatabase = async (increment?: boolean) => {
    try {
      const updatedLike = increment ? likeCount + 1 : likeCount;
      await axios.put(`http://localhost:5000/api/shop/like/${barId}`, { like: updatedLike });
      setLikeCount(updatedLike); // Update local state after successful API update
      console.log('Like updated successfully!');
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const updateDislikeInDatabase = async () => {
    try {
      const updatedDislike = dislikeCount + 1;
      await axios.put(`http://localhost:5000/api/shop/dislike/${barId}`, { dislike: updatedDislike });
      setDislikeCount(updatedDislike); // Update local state after successful API update
      console.log('Dislike updated successfully!');
    } catch (error) {
      console.error('Error updating dislike:', error);
    }
  };

  const handleLike = () => {
    if (liked === null) {
      setLiked(true);
      updateLikeInDatabase(true); // Increment the like count
    }
  };

  const handleDislike = () => {
    if (liked === null) {
      setLiked(false);
      updateDislikeInDatabase(); // Update without incrementing
    }
  };

  const handleOverlayClick = () => {
    setEnlargedImage(null);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/comments/add', {
        id_shop: barId, // Ensure this matches your backend's expected field name for shopId
        // id_user:userId 
        comment: newComment,
      });
      // Assuming your backend returns the inserted comment, you can update state like this:
      setComments([...comments, { comment_text: newComment }]); // Update local state with new comment object
      setNewComment(''); // Clear the input field
      console.log('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  if (!bar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bar-detail">
      <h2 className="bar-name">{bar.name}</h2>
      <img src={bar.logo} alt={bar.name} className="bar-logo" />
      <p className="bar-address">
        <span className="bar-address-label">Address: </span>
        {bar.address}
      </p>
      <p className="bar-description">
        <span className="bar-description-label">Description: </span>
        {bar.description}
      </p>
      <div className="bar-menu">
        <h3>Menu</h3>
        <div className="menu-items">
          {bar.menu.map((item, index) => (
            <div key={index} className="menu-item">
              <img
                src={item}
                alt={`Menu item ${index + 1}`}
                className="menu-image"
                onClick={() => handleImageClick(item)}
              />
              <p>{/* Display item details here */}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bar-video">
        <iframe
          width="560"
          height="315"
          src={bar.video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="thumbs-container">
          <div className="thumbs-up" onClick={handleLike}>
            <span role="img" aria-label="thumbs up">
              👍
            </span>
            <div className="thumbs-count">{likeCount}</div> {/* Display like count */}
          </div>
          <div className="thumbs-down" onClick={handleDislike}>
            <span role="img" aria-label="thumbs down">
              👎
            </span>
            <div className="thumbs-count">{dislikeCount}</div> {/* Display dislike count */}
          </div>
        </div>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {enlargedImage && (
        <div className="image-overlay active" onClick={handleOverlayClick}>
          <img src={enlargedImage} alt="Enlarged menu item" />
        </div>
      )}
      {/* Add more details as needed */}
    </div>
  );
};

export default BarDetailPage;
