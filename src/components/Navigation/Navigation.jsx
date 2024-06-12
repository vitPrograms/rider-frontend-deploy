import * as React from "react";
import "./navigation.scss";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../features/login/loginSlice";
import { Link } from "react-router-dom";
import UserButton from "../User/UserButton";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../Logo/Logo";

export default function Navigation() {
  const loggedIn = useSelector(isLoggedIn);

  return (
    <header>
      <nav>
        <div className="logo">
          <Logo />
        </div>
        <div className="menu">
          <div className="search">
            <input type="text" placeholder="Search"></input>
            <SearchIcon className="search-icon" />
          </div>
          <div className="lang-selector">
            <button className="selected-lang">EN</button>
            {/* <ul className="lang-list">
              <li>
                <button>EN</button>
              </li>
              <li>
                <button>UK</button>
              </li>
            </ul> */}
          </div>
          {loggedIn ? (
            <UserButton />
          ) : (
            <Link to={"/login"} className="link">
              <span className="login-btn">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
