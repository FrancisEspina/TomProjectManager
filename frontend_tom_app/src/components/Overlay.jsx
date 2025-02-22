import React from "react";

const Overlay = ({ isVisible, children }) => {
  return isVisible ? (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      {children}
    </div>
  ) : null;
};

export default Overlay;
