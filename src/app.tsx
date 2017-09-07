// Remember to rename the file from app.ts to app.tsx
// and to keep it in the src/ directory.

import * as React from "react";
import * as ReactDOM from "react-dom";
import Hello from "./Hello";
import Game from './testMule/Bot01'

ReactDOM.render(
  // <Hello name="Willson" />, document.getElementById("root")
  <Game />, document.getElementById("root")
);