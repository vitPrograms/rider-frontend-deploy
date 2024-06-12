import HistoryIcon from "@mui/icons-material/History";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../features/login/loginSlice";
import AddIcon from "@mui/icons-material/Add";
import { isEditMode, setEditModeState } from "../../features/map/mapSlice";
import { Link } from "react-router-dom";

export default function RightPanel() {
  const loggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  const editMode = useSelector(isEditMode);

  const addNewPOIHandler = (e) => {
    e.stopPropagation();
    dispatch(setEditModeState(true));
  };
  const exitEditModeHandler = (e) => {
    e.stopPropagation();
    dispatch(setEditModeState(false));
  };
  return (
    <div className="right-panel">
      <div className="history">
        <HistoryIcon className="history-icon" />
      </div>
      <div className="bottom">
        {loggedIn && !editMode ? (
          <Link to={"/edit"} className="new-poi" onClick={addNewPOIHandler}>
            <AddIcon className="icon" />
            <span className="text">
              <span className="line">NEW</span>
              <span className="line">POI</span>
            </span>
          </Link>
        ) : editMode ? (
          <div className="edit-mode-block">
            <span>You are in edit mode now</span>
            <Link
              to={"/"}
              className="exit-edit-mode-btn"
              onClick={exitEditModeHandler}
            >
              EXIT
            </Link>
          </div>
        ) : (
          <Link to={"/login"} className="login-btn">
            <span>You need to login for adding</span>
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
