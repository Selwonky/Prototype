import * as React from "react";
import { CommonsContext } from "./store-context";

export function useCommons() {
  const ctx = React.useContext(CommonsContext);
  if (!ctx) throw new Error("useCommons must be used within CommonsProvider");
  return ctx;
}
