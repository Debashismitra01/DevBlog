"use client"
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import "./readme.css";

const READMEViewer = ({ readmeUrl }) => {
  const [readme, setReadme] = useState("");

  useEffect(() => {
    fetch(readmeUrl) // Pass the readmeUrl directly
      .then((response) => response.text())
      .then((text) => setReadme(text))
      .catch((error) => console.error("Error fetching README:", error));
  }, [readmeUrl]); // Make sure to add readmeUrl as a dependency

  return (
    <div className="readme">
    <ReactMarkdown
      remarkPlugins={[remarkBreaks]}
    >readme</ReactMarkdown>
    </div>
  );
};

export default READMEViewer;
