"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shop } from '../../../contexts/shopsContext';
import { useParams } from 'next/navigation';
import './restaurantdetails.css';

const RestaurantDetailPage: React.FC = () => {
  const params = useParams();
  const restaurantId = params.Id;

  const [restaurant, setRestaurant] = useState<Shop | null>(null);
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
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shop/get/${restaurantId}`);
        if (response.data.length > 0) {
          const fetchedRestaurant = response.data[0];
          setRestaurant(fetchedRestaurant);
          setLikeCount(fetchedRestaurant.like);
          setDislikeCount(fetchedRestaurant.dislike);
        } else {
          console.error(`No restaurant found with id ${restaurantId}`);
        }
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/comments/get/${restaurantId}`);
        const commentData = await Promise.all(response.data.map(async (el: any) => {
          try {
            const clientResponse = await axios.get(`http://localhost:5000/api/user/get/${el.id_user}`);
            const client = clientResponse.data;
            return {
              client: client,
              comment: el.comment
            };
          } catch (error) {
            console.error('Error fetching user details for comment:', error);
            return {
              client: 'Unknown',
              comment: el.comment
            };
          }
        }));
        setComments(commentData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (restaurantId) {
      fetchRestaurant();
      fetchComments();
    }
  }, [restaurantId]);

  const handleImageClick = (src: string) => {
    setEnlargedImage(src);
  };

  const updateLikeInDatabase = async (increment?: boolean) => {
    try {
      const updatedLike = increment ? likeCount + 1 : likeCount;
      await axios.put(`http://localhost:5000/api/shop/like/${restaurantId}`, { like: updatedLike });
      setLikeCount(updatedLike);
      console.log('Like updated successfully!');
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const updateDislikeInDatabase = async () => {
    try {
      const updatedDislike = dislikeCount + 1;
      await axios.put(`http://localhost:5000/api/shop/dislike/${restaurantId}`, { dislike: updatedDislike });
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
        id_shop: restaurantId,
        id_user: user.id,
        comment: newComment,
      });
      const clientResponse = await axios.get(`http://localhost:5000/api/user/get/${user.id}`);
      const currentClient = clientResponse.data;
      setComments([...comments, {
        client: currentClient,
        comment: newComment
      }]);
      setNewComment('');
      console.log('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="restaurant-detail">
      <h2 className="restaurant-name">{restaurant.name}</h2>
      <img src={restaurant.logo} alt={restaurant.name} className="restaurant-logo" />
      <p className="restaurant-address">
        <span className="restaurant-address-label">Address: </span>
        {restaurant.address}
      </p>
      <p className="restaurant-description">
        <span className="restaurant-description-label">Description: </span>
        {restaurant.description}
      </p>
      <div className="restaurant-menu">
        <h3>Menu</h3>
        <div className="menu-items">
          {restaurant.menu.map((item, index) => (
            <div key={index} className="menu-item">
              <img
                src={item}
                alt={`Menu item ${index + 1}`}
                className="menu-image"
                onClick={() => handleImageClick(item)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="restaurant-video">
        <iframe
          width="560"
          height="315"
          src={restaurant.video}
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
            <span className="thumbs-count">{likeCount}</span>
          </div>
          <div className="thumbs-down" onClick={handleDislike}>
            <span role="img" aria-label="thumbs down">
              👎
            </span>
            <span className="thumbs-count">{dislikeCount}</span>
          </div>
        </div>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <img src="/path-to-default-avatar.jpg" alt="User avatar" />
            <div className="comment-details">
              <div className="comment-client">{comment.client.fullname}</div>
              <div>{comment.comment}</div>
            </div>
          </div>
        ))}
        {user && (
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
        )}
      </div>
      {enlargedImage && (
        <div className="image-overlay" onClick={handleOverlayClick}>
          <img src={enlargedImage} alt="Enlarged menu item" />
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
