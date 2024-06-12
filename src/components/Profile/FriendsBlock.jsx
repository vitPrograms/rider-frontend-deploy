import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { URL } from "../../config/URL/urls";

export default function FriendsBlock(props) {
  const { user } = props;

  return (
    <div className="friends-block">
      <span className="title friends">FRIENDS</span>
      <ul className="friend-list">
        {user.friends.length < 1 ? (
          <div>NO FRIENDS YET</div>
        ) : (
          user.friends.map((friend) => {
            return (
              <Link
                to={`${URL.CLIENT.ENDPOINT.RIDER}/${friend.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <li className="friend-el" key={friend.id}>
                  {friend.picture ? (
                    <img src={friend.picture} className="logo" />
                  ) : (
                    <PersonIcon className="logo" />
                  )}
                  <div className="info">
                    <span className="fullname">{friend.name}</span>
                    <span className="username">{friend.username}</span>
                  </div>
                </li>
              </Link>
            );
          })
        )}
      </ul>
    </div>
  );
}
