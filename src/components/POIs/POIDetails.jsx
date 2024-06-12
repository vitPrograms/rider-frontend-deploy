import { Link, useNavigate, useParams } from "react-router-dom";
import "./pois.scss";
import CommentsList from "./CommentsList";
import { useDispatch, useSelector } from "react-redux";
import {
  getMapPOIs,
  getPOIById,
  setMapPOIs,
} from "../../features/map/mapSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlaceIcon from "@mui/icons-material/Place";
import RouteIcon from "@mui/icons-material/Route";
import CircularProgress from "@mui/material/CircularProgress";
import CommentForm from "./CommentForm";
import { useQuery } from "@apollo/client";
import { QUERY } from "../../config/graphql/query";
import { useEffect, useState } from "react";
import {
  selectPoiDislikes,
  selectPoiLikes,
  setPoiDetailData,
} from "../../features/poiDetail/poiDetailSlice";
import Loading from "../Loading/Loading";
import GoHome from "../GoHome/GoHome";
import BuildIcon from "@mui/icons-material/Build";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BedIcon from "@mui/icons-material/Bed";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TrafficIcon from "@mui/icons-material/Traffic";

const placeTypes = {
  workshop: <BuildIcon className="icon" />,
  food: <RestaurantIcon className="icon" />,
  rest: <BedIcon className="icon" />,
  park: <LocalParkingIcon className="icon" />,
  traffic: <TrafficIcon className="icon" />,
};

export default function POIDetails(props) {
  const { form = true } = props;
  const { id } = useParams();
  if (id === "profile" || id === "edit") return null;
  const likes = useSelector(selectPoiLikes);
  const dislikes = useSelector(selectPoiDislikes);
  const { data, loading, error } = useQuery(QUERY.POI, {
    variables: {
      id: id,
    },
  });
  const [poi, setPoi] = useState({});
  const dispatch = useDispatch();

  const handleButtonClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    if (data) {
      dispatch(setPoiDetailData(data.poi));
      // dispatch(setMapPOIs([data.poi]));
      setPoi(data.poi);
    }
  }, [data, loading, error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <GoHome />
      <div className="poi-details">
        <div className="place-el">
          <div className="place-head">
            <div className="main-info">
              {poi.type == "place" ? (
                <PlaceIcon className="type-icon" />
              ) : (
                <RouteIcon className="type-icon" />
              )}
              <div className="adress-block">
                <div className="grouped">
                  <p className="place-name">{poi.title}</p>
                  <ul className="types-list">
                    {poi?.types?.map((type) => (
                      <li key={type} className="type-item">
                        {placeTypes[type]}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="place-address">{poi.address}</p>
              </div>
            </div>
            <div className="author-block">
              <div>
                <p className="date">{poi.createdAt}</p>
                <Link to={`/rider/${poi?.user?.username}`} className="author">
                  {poi?.user?.name}
                </Link>
              </div>
              <PersonIcon className="author-icon" />
            </div>
          </div>
          <div className="place-content">
            <p className="place-text">{poi.description}</p>
          </div>
          <div className="place-footer">
            <div className="feedback">
              <div className="likes">
                <span className="count">{likes}</span>
                <ThumbUpIcon className="like-icon" />
              </div>
              <div className="dislikes">
                <span className="count">{dislikes}</span>
                <ThumbDownIcon className="dislike-icon" />
              </div>
            </div>
            <div className="reference-btn">
              <button>Another places</button>
            </div>
          </div>
          <MoreVertIcon className="actions-btn" />
          <ul className="actions">
            <li onClick={handleButtonClick}>Видалити</li>
            <li onClick={handleButtonClick}>Поскаржитись</li>
            <li onClick={handleButtonClick}>Змінити</li>
          </ul>
        </div>
        <div className="comments-block">
          {form && <CommentForm author={poi?.user} />}
          <h2>COMMENTS</h2>
          <CommentsList author={poi?.user} />
        </div>
      </div>
    </>
  );
}
