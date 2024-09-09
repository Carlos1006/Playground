import { FC } from "react";

const Card: FC = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Card Title</h3>
      </div>
      <div className="card-body">
        <p>Card Content</p>
      </div>
    </div>
  );
};

export default Card;
