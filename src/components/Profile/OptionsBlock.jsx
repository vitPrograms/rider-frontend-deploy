import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMapPOIs, setMapPOIs } from "../../features/map/mapSlice";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";
import {
  selectLoginData,
  selectUserId,
  setLoginData,
} from "../../features/login/loginSlice";
import { MUTATION } from "../../config/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export default function OptionsBlock(props) {
  const { username, fullname, user } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector(selectUserId);
  const [isFriend, setIsFriend] = useState(false);
  const [addUserFriend] = useMutation(MUTATION.ADD_FRIEND);
  const [removeUserFriend] = useMutation(MUTATION.REMOVE_FRIEND);

  const logoutHandler = (e) => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("accessToken");
    dispatch(setLoginData(null));
    dispatch(setMapPOIs([]));
    navigate("/");
  };

  const addFriendHandler = () => {
    if (user.id === currentUserId) {
      toast.error("User are the same as current user");
      return;
    }

    if (isFriend) {
      toast.success("User already are a friend");
      return;
    }

    const query = {
      id: currentUserId,
      friendId: user.id,
    };

    addUserFriend({
      variables: query,
    })
      .then((result) => {
        toast.success("Friend successfully added");
        setIsFriend(true);
      })
      .catch((err) => {
        toast.error("Error adding friend");
        console.error(err);
      });
  };

  const removeFriendHandler = () => {
    const query = {
      id: currentUserId,
      friendId: user.id,
    };

    removeUserFriend({
      variables: query,
    })
      .then((result) => {
        toast.success("Friend successfully removed");
        setIsFriend(false);
      })
      .catch((err) => {
        toast.error("Error removing friend");
        console.error(err);
      });
  };

  useEffect(() => {
    if (user && currentUserId && user?.friends) {
      setIsFriend(
        Boolean(user.friends.find((friend) => friend.id === currentUserId))
      );
    }
  }, [user]);

  return (
    <div className="user-options-block">
      <div className="info">
        {user?.picture && <img src={user.picture} className="picture" />}
        <span className="fullname">{fullname}</span>
        <span className="username">{username}</span>
      </div>
      <div className="options">
        <ul className="option-list">
          {currentUserId == user?.id || !user ? (
            <>
              <li className="option-el mobile">
                <span>Mobile app</span>
              </li>
              <li className="option-el">
                <span>Help</span>
              </li>
              <li className="option-el danger">
                <span onClick={logoutHandler}>Log out</span>
              </li>
            </>
          ) : (
            <li className="option-el">
              {isFriend ? (
                <span onClick={removeFriendHandler}>
                  <PersonIcon />
                  Remove from friends
                </span>
              ) : (
                <span onClick={addFriendHandler}>
                  <PersonIcon />
                  Add as friend
                </span>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
