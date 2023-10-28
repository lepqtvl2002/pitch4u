"use client";

import { AppProgressBar } from "next-nprogress-bar";

function PageProgress() {
  return (
    <AppProgressBar
      height="0.15rem"
      color="hsl(var(--primary))"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}

export default PageProgress;
