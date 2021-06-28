import { Circle } from "better-react-spinkit";

function Loader() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: "linear-gradient(to left top, aqua, blue)",
      }}
    >
      <div>
        <Circle color="white" size={100} />
      </div>
    </div>
  );
}

export default Loader;
