import React from "react";
import { createRoot } from "react-dom/client";
import "styles/style.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(<h1>Hello CodeSandbox</h1>);
