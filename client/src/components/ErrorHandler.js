import React from "react";

const ErrorHandler = ({ error }) => {
  return <div style={{ fontSize: "20px", color: "red" }}>{error}</div>;
};

export default ErrorHandler;
