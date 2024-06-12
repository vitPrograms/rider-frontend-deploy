import { useEffect, useState } from "react";
import loading from "../../assets/loading-crop.gif";
import "./loading.scss";

const labels = [
  "Gearing up for the ride!",
  "Fueling the cycling magic...",
  "Pedaling the data through...",
  "Loading up the bike routes!",
  "Spinning the information...",
  "Pumping the data for you!",
  "Shifting into high gear...",
  "Greasing the wheels of progress...",
  "Pedaling the bytes for you!",
  "Revving up the cycling data...",
];

export default function Loading(props) {
  const { showText = true } = props;
  const [label, setLabel] = useState(labels[0]);

  const newLabel = () => {
    setLabel(labels[Math.floor(Math.random() * labels.length)]);
  };

  useEffect(() => {
    if (showText) newLabel();
  }, []);

  return (
    <div className="loading-block">
      <img src={loading} className="loading-img" />
      {showText && (
        <span className="text" onAnimationIteration={newLabel}>
          {label}
        </span>
      )}
    </div>
  );
}
