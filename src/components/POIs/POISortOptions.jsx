import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortOrder } from "../../features/map/mapSlice";

export default function POISortOptions({ props }) {
  const [selectedOption, setSelectedOption] = useState("recent");
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    dispatch(setSortOrder(event.target.value));
  };

  return (
    <ul className="options">
      <li className={`btn ${selectedOption === "old" ? "active" : ""}`}>
        <label htmlFor="option-old">
          <input
            type="radio"
            id="option-old"
            value="old"
            checked={selectedOption === "old"}
            onChange={handleOptionChange}
            hidden
          />
          <span>Old</span>
        </label>
      </li>
      <li className={`btn ${selectedOption === "recent" ? "active" : ""}`}>
        <label htmlFor="option-recent">
          <input
            type="radio"
            id="option-recent"
            value="recent"
            checked={selectedOption === "recent"}
            onChange={handleOptionChange}
            hidden
          />
          <span>Recent</span>
        </label>
      </li>
    </ul>
  );
}
