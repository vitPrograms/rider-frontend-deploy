import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PlaceIcon from "@mui/icons-material/Place";
import RouteIcon from "@mui/icons-material/Route";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY } from "../../config/graphql/query";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getMapPOIs, setMapPOIs } from "../../features/map/mapSlice";
import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

const poiTypes = {
  place: <PlaceIcon className="icon" />,
  path: <RouteIcon className="icon" />,
};

export default function ChangesBlock(props) {
  const { userId, profileRef } = props;
  const dispatch = useDispatch();
  const pois = useSelector(getMapPOIs);
  const { data, loading, error } = useQuery(QUERY.ALL_POIS, {
    variables: {
      ...(userId && { userId: userId }),
    },
  });

  const scrollToEnd = () => {
    if (!profileRef.current) return;
    scroll.scrollTo(profileRef.current.offsetHeight, {
      duration: 500,
      smooth: true,
    });
  };

  useEffect(() => {
    if (data) {
      dispatch(setMapPOIs(data?.pois));
    }
  }, [data, dispatch]);

  if (loading) return <Loading showText={false} />;
  if (error) return <div>Error</div>;

  return (
    <div className="changes-block">
      <span className="title changes">CHANGES</span>
      <ul className="change-list">
        {pois.map((poi) => {
          return (
            <Link
              key={poi.id}
              to={`/profile/${poi.id}`}
              className="link"
              onClick={scrollToEnd}
            >
              <li className="change-el">
                {poiTypes[poi.type]}
                <div className="info">
                  <span className="poi-title">{poi.title}</span>
                  <span className="address">{poi.address}</span>
                </div>
                <div className="feedback">
                  <div>
                    <span>{poi.likes}</span>
                    <ThumbUpIcon className="icon" />
                  </div>
                  <div>
                    <span>{poi.dislikes}</span>
                    <ThumbDownIcon className="icon" />
                  </div>
                  <div>
                    <span>{poi.feedbacks.length}</span>
                    <QuestionAnswerIcon className="icon" />
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
