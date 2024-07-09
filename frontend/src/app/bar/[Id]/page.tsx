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
  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [comments, setComments] = useState<{ client: { fullname: string }[]; comment: string }[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/isloged', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error checking login status:', error);
        setUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchBar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shop/get/${barId}`);
        if (response.data.length > 0) {
          const fetchedBar = response.data[0];
          setBar(fetchedBar);
          setLikeCount(fetchedBar.like);
          setDislikeCount(fetchedBar.dislike);
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
        // Map over comments and fetch user details for each comment

        const commentData = await Promise.all(response.data.map(async (el: any) => {
          try {
            // Fetch user details using user_id
            const clientResponse = await axios.get(`http://localhost:5000/api/user/get/${el.id_user}`);
            const client = clientResponse.data; // Assuming user data includes fullname
            return {
              client: client,
              comment: el.comment
            };
          } catch (error) {
            console.error('Error fetching user details for comment:', error);
            return {
              client: 'Unknown', // Default value if fullname fetch fails
              comment: el.comment
            };
          }
        }));
        setComments(commentData);
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
      setLikeCount(updatedLike);
      console.log('Like updated successfully!');
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const updateDislikeInDatabase = async () => {
    try {
      const updatedDislike = dislikeCount + 1;
      await axios.put(`http://localhost:5000/api/shop/dislike/${barId}`, { dislike: updatedDislike });
      setDislikeCount(updatedDislike);
      console.log('Dislike updated successfully!');
    } catch (error) {
      console.error('Error updating dislike:', error);
    }
  };

  const handleLike = () => {
    if (liked === null) {
      setLiked(true);
      updateLikeInDatabase(true);
    }
  };

  const handleDislike = () => {
    if (liked === null) {
      setLiked(false);
      updateDislikeInDatabase();
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
      const response = await axios.post('http://localhost:5000/api/comments/add', {
        id_shop: barId,
        id_user: user.id,
        comment: newComment,
      });
      // Fetch user details for the current user
      const clientResponse = await axios.get(`http://localhost:5000/api/user/get/${user.id}`);
      const currentClient = clientResponse.data;
      // Add the new comment with user details
      setComments([...comments, {
        client: currentClient, // Assign user object to client
        comment: newComment
      }]);
      setNewComment('');
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
              {/* Display item details here */}
              {/* Replace this placeholder with actual item details */}
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
            <div className="thumbs-count">{likeCount}</div>
          </div>
          <div className="thumbs-down" onClick={handleDislike}>
            <span role="img" aria-label="thumbs down">
              👎
            </span>
            <div className="thumbs-count">{dislikeCount}</div>
          </div>
        </div>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((el, index) => (
            <li key={index} className="comment">
              {/* Display user photo if available */}
              {user && user.photo && (
                <img src={user.photo} alt={user.fullname} />
              )}
              <div className="comment-details">
                {/* Display user fullname */}
                {Array.isArray(el.client) ? (
                  el.client.map((userObj, idx) => (
                    <p key={idx} className="comment-client">{userObj.fullname}</p>
                  ))
                ) : (
                  <p className="comment-client">{el.client.fullname}</p>
                )}
                {/* Display comment */}
                <p>{el.comment}</p>
              </div>
            </li>
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
    </div>
  );
};

export default BarDetailPage;
