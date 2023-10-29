import { FC } from "react";

interface MapProps {
  id?: string;
  elements: string[];
}

const Map: FC<MapProps> = ({ id, elements }: MapProps) => {
  return (
    <div id={id}>
      {elements.map((element, index) => (
        <span key={index}>{element}</span>
      ))}
    </div>
  );
};

export default Map;
