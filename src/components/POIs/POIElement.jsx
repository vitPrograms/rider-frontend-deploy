import { useState } from "react";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlaceIcon from "@mui/icons-material/Place";
import RouteIcon from "@mui/icons-material/Route";
import BuildIcon from "@mui/icons-material/Build";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BedIcon from "@mui/icons-material/Bed";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TrafficIcon from "@mui/icons-material/Traffic";

import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY } from "../../config/graphql/query";
import { useDispatch } from "react-redux";
import { setMapPOIs } from "../../features/map/mapSlice";
import { animateScroll as scroll } from "react-scroll";

const placeTypes = {
  workshop: <BuildIcon className="icon" />,
  food: <RestaurantIcon className="icon" />,
  rest: <BedIcon className="icon" />,
  park: <LocalParkingIcon className="icon" />,
  traffic: <TrafficIcon className="icon" />,
};

export default function POIElement({ poi, link = "" }) {
  const [getPOIs, { data, loading, error }] = useLazyQuery(QUERY.ALL_POIS);
  const dispatch = useDispatch();

  const handleButtonClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleReferencedClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    getPOIs({ variables: { userId: poi.user.id } }).then((result) => {
      dispatch(setMapPOIs(result.data.pois));
    });
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  return (
    <Link
      to={`${link}/${poi.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
      onClick={scrollToTop}
    >
      <li className="place-el">
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
                  {poi.types.map((type) => (
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
              <p className="author">{poi.user.username}</p>
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
              <span className="count">{poi.likes}</span>
              <ThumbUpIcon className="like-icon" />
            </div>
            <div className="dislikes">
              <span className="count">{poi.dislikes}</span>
              <ThumbDownIcon className="dislike-icon" />
            </div>
          </div>
          <div to={"/"} className="reference-btn">
            <button onClick={handleReferencedClick}>Another places</button>
          </div>
        </div>
        <MoreVertIcon className="actions-btn" />
        <ul className="actions">
          <li onClick={handleButtonClick}>Видалити</li>
          <li onClick={handleButtonClick}>Поскаржитись</li>
          <li onClick={handleButtonClick}>Змінити</li>
        </ul>
      </li>
    </Link>
  );
}
