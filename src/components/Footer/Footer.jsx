import { Button } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import UKIcon from "../../assets/UK.jsx";
import UAIcon from "../../assets/UA.jsx";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./footer.scss";
import Logo from "../Logo/Logo";

export default function Footer({ props }) {
  return (
    <footer>
      <div className="container">
        <div className="actions">
          <div className="lang">
            <Select defaultValue={"en"} className="lang-select">
              <MenuItem value="en" className="option">
                <UKIcon className="icon" />
                <span>English</span>
              </MenuItem>
              <MenuItem value="uk" className="option" disabled>
                <UAIcon className="icon" />
                Українська
              </MenuItem>
            </Select>
          </div>
          <div className="mobile-app">
            <Button className="btn">
              <InstallMobileIcon className="icon" />
              <span>Download mobile app</span>
            </Button>
          </div>
        </div>
        <div className="info">
          <ul className="list">
            <li className="title">Discover</li>
            <li>
              <a href="#">Bicycle roads</a>
            </li>
            <li>
              <a href="#">Interesting places</a>
            </li>
            <li>
              <a href="#">Find path</a>
            </li>
            <li>
              <a href="#">Rider premium</a>
            </li>
            <li>
              <a href="#">Invite friends</a>
            </li>
            <li>
              <a href="#">Rider app</a>
            </li>
          </ul>
          <ul className="list">
            <li className="title">Rider</li>
            <li>
              <a href="#">About rider</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="contacts">
          <div className="brand">
            <div className="service">
              <div className="logo">
                <Logo />
              </div>
              <div className="version-block">
                <span className="name">Rider</span>
                <span className="version">version 1.0.0</span>
              </div>
            </div>
            <span>Made in Ukraine with 💖</span>
          </div>
          <div className="socials">
            <ul>
              <li>
                <FacebookIcon className="icon" />
              </li>
              <li>
                <YouTubeIcon className="icon" />
              </li>
              <li>
                <InstagramIcon className="icon" />
              </li>
              <li>
                <TelegramIcon className="icon" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
