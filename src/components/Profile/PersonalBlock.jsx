import { useMutation } from "@apollo/client";
import { MUTATION } from "../../config/graphql/mutation";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import RouteIcon from "@mui/icons-material/Route";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/login/loginSlice";

export default function PersonalBlock(props) {
  const { user, username, fullname, setUsername, setFullname } = props;
  const userId = user.id;
  const [usernameChange, setUsernameChange] = useState(false);
  const [fullnameChange, setFullnameChange] = useState(false);
  const usernameRef = useRef(null);
  const fullnameRef = useRef(null);
  const currentUserId = useSelector(selectUserId);

  const [changeUsername, { usernameData, usernameLoading, usernameError }] =
    useMutation(MUTATION.CHANGE_USERNAME);

  const [changeName, { nameData, nameLoading, nameError }] = useMutation(
    MUTATION.CHANGE_NAME
  );

  const selectUsernameHandler = () => {
    setUsernameChange(true);
  };

  const selectFullnameHandler = () => {
    setFullnameChange(true);
  };

  useEffect(() => {
    if (usernameChange && usernameRef.current) {
      usernameRef.current.focus();
    }
    if (fullnameChange && fullnameRef.current) {
      fullnameRef.current.focus();
    }
  }, [usernameChange, fullnameChange]);

  const changeUsernameHandler = (e) => {
    if (username.length <= 6) {
      toast.warn("Username must be at least 6 characters");
      return;
    }

    if (username.length > 20) {
      toast.warn("Username cannot be more than 12 characters");
      return;
    }

    const forbiddenCharactersRegex = /[ *(){}\[\]\/+=&^%$#@!`*,?]/;
    if (forbiddenCharactersRegex.test(username)) {
      toast.warn("Username cannot contain forbidden characters");
      return;
    }

    changeUsername({
      variables: {
        id: userId,
        username: username,
      },
    })
      .then((response) => {
        if (response.data.changeUserUsername) {
          toast.success("Username changed successfully");
          setUsername(username);
          setUsernameChange(false);
        } else {
          toast.error(response.data.changeUsername.message);
        }
      })
      .catch((err) => {
        toast.error("Error changing username");
        console.error(err);
      });
  };
  const changeFullnameHandler = (e) => {
    if (fullname.length < 2) {
      toast.warn("Fullname must be at least 2 characters");
      return;
    }

    changeName({
      variables: {
        id: userId,
        name: fullname,
      },
    })
      .then((response) => {
        if (response.data.changeUserName) {
          toast.success("Name changed successfully");
          setFullname(fullname);
          setFullnameChange(false);
        } else {
          toast.error(response.data.changeUserName.message);
        }
      })
      .catch((err) => {
        toast.error("Error changing name");
        console.error(err);
      });
  };

  return (
    <div className="personal-block">
      <span className="title personal">PERSONAL</span>
      {userId == currentUserId && (
        <div className="user-fields">
          <div className="username">
            <div className="label">
              <span>Username</span>
              {usernameChange ? (
                <div className="edit-menu">
                  <CloseIcon
                    className="change-icon edit"
                    onClick={(e) => {
                      setUsername(user.username);
                      setUsernameChange(false);
                    }}
                  />
                  <CheckIcon
                    className="change-icon edit"
                    onClick={changeUsernameHandler}
                  />
                </div>
              ) : (
                <EditIcon
                  onClick={selectUsernameHandler}
                  className="change-icon"
                />
              )}
            </div>
            <input
              ref={usernameRef}
              disabled={!usernameChange}
              type="text"
              className="field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
            />
          </div>
          <div className="fullname">
            <div className="label">
              <span>Full name</span>
              {fullnameChange ? (
                <div className="edit-menu">
                  <CloseIcon
                    className="change-icon edit"
                    onClick={(e) => {
                      setFullname(user.name);
                      setFullnameChange(false);
                    }}
                  />
                  <CheckIcon
                    className="change-icon edit"
                    onClick={changeFullnameHandler}
                  />
                </div>
              ) : (
                <EditIcon
                  onClick={selectFullnameHandler}
                  className="change-icon"
                />
              )}
            </div>
            <input
              ref={fullnameRef}
              disabled={!fullnameChange}
              type="text"
              className="field"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="email">
            <div className="label">
              <span>Email</span>
            </div>
            <input disabled type="text" className="field" value={user.email} />
          </div>
          <div className="google-connection">
            <div className="label">
              <span>Google connection</span>
            </div>
            <input disabled type="text" className="field" value={user.email} />
          </div>
        </div>
      )}
      <div className="user-stats">
        <div className="stat" title="Places added">
          <PlaceIcon className="icon" />
          <span className="count">{user.stats.places}</span>
        </div>
        <div className="stat" title="Paths added">
          <RouteIcon className="icon" />
          <span className="count">{user.stats.paths}</span>
        </div>
        <div className="stat" title="Likes">
          <ThumbUpIcon className="icon" />
          <span className="count">{user.stats.likes}</span>
        </div>
        <div className="stat" title="Friends">
          <PersonIcon className="icon" />
          <span className="count">{user.stats.friends}</span>
        </div>
      </div>
    </div>
  );
}
