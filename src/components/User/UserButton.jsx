import { useSelector } from "react-redux";
import {
  selectLoginName,
  selectLoginPicture,
} from "../../features/login/loginSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./user.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserButton({ props }) {
  const username = useSelector(selectLoginName);
  const picture = useSelector(selectLoginPicture);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = picture;
    img.onload = () => setIsImageLoaded(true);
  }, [picture]);

  return (
    <Link to={"/profile"} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="user-button">
        <ExpandMoreIcon className="expand" />
        <span className="name">{username}</span>
        {isImageLoaded && <img src={picture} className="picture" />}
      </div>
    </Link>
  );
}
