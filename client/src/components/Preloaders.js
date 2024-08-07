import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

function Preloader() {
  const [loading] = useState(true);
  const [color] = useState("red");

  return (
    <div className="sweet-loading ">
      <ScaleLoader
        color={color}
        loading={loading}
        size={250}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="items-center "
      />
    </div>
  );
}

export default Preloader;
