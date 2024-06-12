import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlaceIcon from "@mui/icons-material/Place";

const feedbackIcons = {
  like: <ThumbUpIcon />,
  dislike: <ThumbDownIcon />,
};

export default function CommentElement({ feedback }) {
  return (
    <li className="comment-el">
      <div className="top">
        <div className="main-info">
          <PersonIcon className="user-icon" />
          <div className="author-block">
            <span className="author">{feedback.user.username}</span>
            <span className="date">{feedback.createdAt}</span>
          </div>
        </div>
        <div className={`feedback ${feedback.feedback}`}>
          {feedbackIcons[feedback.feedback]}
        </div>
      </div>
      <div className="bottom">
        <span className="comment-text">{feedback.description}</span>
      </div>
    </li>
  );
}
