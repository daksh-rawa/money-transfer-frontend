import React from "react";

const BottomWarningButton = ({ message, buttonText, to }) => (
  <div className="mt-6 text-center">
    <span className="text-gray-600">{message} </span>
    <button onClick={to} typr="button"></button>
    </div>
);

export default BottomWarningButton;
