import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./go-home.scss";

export default function GoHome(props) {
  return (
    <Link
      className="go-back-btn"
      to={"/"}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <ArrowBackIosIcon className="icon" />
      GO BACK
    </Link>
  );
}
