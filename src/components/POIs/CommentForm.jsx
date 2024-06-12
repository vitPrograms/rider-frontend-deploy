import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addPOIFeedback,
  selectPoiId,
} from "../../features/poiDetail/poiDetailSlice";
import { selectUserId } from "../../features/login/loginSlice";
import { useMutation } from "@apollo/client";
import { MUTATION } from "../../config/graphql/mutation";

export default function CommentForm(props) {
  const { author } = props;
  const [description, setDescription] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const poiId = useSelector(selectPoiId);
  const userId = useSelector(selectUserId);
  const [addFeedback, { data, loading, error }] = useMutation(
    MUTATION.NEW_FEEDBACK
  );
  const dispatch = useDispatch();

  const newCommentHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (description?.length == 0) {
      return toast.warn("Please enter a description");
    }

    if (!selectedFeedback) {
      return toast.warn("Please select a feedback");
    }

    const comment = {
      description: description,
      feedback: selectedFeedback,
      poiId: poiId,
      userId: userId,
    };

    addFeedback({
      variables: comment,
    })
      .then((result) => {
        toast.success("Comment added successfully");
        dispatch(addPOIFeedback(result.data.addFeedback));
        setSelectedFeedback(null);
        setDescription("");
      })
      .error((err) => {
        toast.error("Error: " + err.message);
      });
  };

  if (author) {
    return <h2>THIS IS YOUR POI</h2>;
  }

  return (
    <form className="comment-form">
      <div className="comment-content">
        <textarea
          className="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Your feedback..."
          required
          disabled={loading}
        />
        <div className="feedback">
          <ThumbUpIcon
            className={`like-icon ${
              selectedFeedback === "like" ? "active" : ""
            }`}
            onClick={() => setSelectedFeedback("like")}
          />
          <ThumbDownIcon
            className={`dislike-icon ${
              selectedFeedback === "dislike" ? "active" : ""
            }`}
            onClick={() => setSelectedFeedback("dislike")}
          />
        </div>
      </div>
      <Button type="submit" onClick={newCommentHandler} disabled={loading}>
        Comment
      </Button>
    </form>
  );
}
