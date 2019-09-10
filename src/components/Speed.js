import React from "react";

export default props => {
  return (
    <div className="speed-controller">
      <label>Speed</label>
      <input
        value={props.speed}
        min={0}
        max={8}
        type="range"
        onChange={e => {
          props.handleChange(e);
        }}
      />
    </div>
  );
};
