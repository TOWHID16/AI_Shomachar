// Loader.jsx
import React from "react";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <img alt="Loading..." src="/logo.png" />
      </div>
      <p className="text-sm text-muted-foreground">
        AI Shomachar is thinking...
      </p>
    </div>
  );
};
