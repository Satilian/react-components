import { App } from "App/App";
import React from "react";
import { createRoot } from "react-dom/client";
import "styles/style.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(<App />);
