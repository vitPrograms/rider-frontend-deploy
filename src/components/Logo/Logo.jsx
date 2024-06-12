import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import "./logo.scss";
import { Link, useNavigate } from "react-router-dom";
import RiderLogo from "../../assets/RiderLogo";

export default function Logo({ props }) {
  return (
    <Link to={"/"} className="link">
      <RiderLogo className="logo" width={50} height={50} />
    </Link>
  );
}
