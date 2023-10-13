import React from 'react';
import FeedbackIcon from '@mui/icons-material/Feedback';

const Card = ({ id, title, tag, user }) => {
  const randomColor = () => {
    const randomRGB = Array(3)
      .fill()
      .map(() => Math.floor(Math.random() * 100) + 155)
      .join(', ');

    return `rgb(${randomRGB})`;
  };

  const backgroundColor = {
    backgroundColor: randomColor(),
  };

  return (
    <div className="card-container">
      <div className="card-heading">
        <p className="card-id">{id}</p>
        <p className="card-name" style={backgroundColor}>
          {user[0]}
        </p>
      </div>
      <p className="card-title">{title}</p>
      <div className="card-tag">
        <span className="material-symbols-outlined">
          <FeedbackIcon />
        </span>
        <p>{tag}</p>
      </div>
    </div>
  );
};

export default Card;
