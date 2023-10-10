import React from "react";

interface Props {
  width: number;
  height: number;
  depth: number;
}

const Grid3D: React.FC<Props> = ({ width, height, depth }) => {
  const grid = [];

  for (let z = 0; z < depth; z++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        grid.push(
          <div
            key={`${x}-${y}-${z}`}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "gray",
              border: "1px solid black",
              display: "inline-block",
              margin: "1px",
            }}
          />
        );
      }
      grid.push(<br key={`br-${y}-${z}`} />);
    }
    grid.push(<hr key={`hr-${z}`} />);
  }

  return <div>{grid}</div>;
};

export default Grid3D;
