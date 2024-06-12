import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import "./short-info.scss";

export default function ShortInfo(props) {
  const { place } = props;

  const description =
    place.description.length > 200
      ? `${place.description.slice(0, 200)}...`
      : place.description;

  return (
    <div className="info-window">
      <div className="top">
        <h3 className="title">{place.title}</h3>
        <span className="address">{place.address}</span>
      </div>
      <div className="content">
        <p>{description}</p>
      </div>
      <div className="bottom">
        <div className="author">
          <PersonIcon className="icon" />
          <span>{place.user.username}</span>
        </div>
        <div className="feedback">
          <div>
            <span>{place.likes}</span>
            <ThumbUpIcon className="icon" />
          </div>
          <div>
            <span>{place.dislikes}</span>
            <ThumbDownIcon className="icon" />
          </div>
          <div>
            <span>{place.feedbacks.length}</span>
            <QuestionAnswerIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
