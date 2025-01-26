import React from "react";
import { styled } from "@mui/material/styles";
const ProjectProgress = () => {
  return (
    <>
      <div className="bg-white p-5  rounded-2xl">
        <div>
          <p>Project Status</p>
          <progress value={0.5} />
        </div>
      </div>
    </>
  );
};

export default ProjectProgress;
