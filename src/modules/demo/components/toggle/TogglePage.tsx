import React from "react";
import { Toggle } from "components/Toggle/Toggle";

export const TogglePage = () => {
  return (
    <div className="container">
      <h1>Toggle</h1>

      <Toggle style={{ fontSize: "500px", color: "blue" }} />
    </div>
  );
};
