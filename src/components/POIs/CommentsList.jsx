import { useQuery } from "@apollo/client";
import CommentElement from "./CommentElement";
import { QUERY } from "../../config/graphql/query";
import { useEffect } from "react";
import { selectPoiFeedbacks } from "../../features/poiDetail/poiDetailSlice";
import { useSelector } from "react-redux";

export default function CommentsList({ props }) {
  const feedbacks = useSelector(selectPoiFeedbacks);

  if (!feedbacks || feedbacks.length === 0) {
    return <div>NO COMMENTS YET</div>;
  }

  return (
    <ul className="comments-list">
      {feedbacks.map((feedback) => {
        return <CommentElement key={feedback.id} feedback={feedback} />;
      })}
    </ul>
  );
}
