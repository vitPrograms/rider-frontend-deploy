export default function Polyline(props) {
  const {
    type,
    path,
    editable,
    strokeColor,
    strokeOpacity,
    strokeWeight,
    map,
    maps,
  } = props;

  let polyline = new maps.Polyline({
    path: path.map((coord) => new maps.LatLng(coord.lat, coord.lng)),
    type,
    editable,
    strokeColor,
    strokeOpacity,
    strokeWeight,
    map,
  });

  return null;
}
