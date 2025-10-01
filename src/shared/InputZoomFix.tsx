"use client";

import { useEffect } from "react";

export default function InputZoomFix() {
  useEffect(() => {
    const handleFocus = () => {
      const meta = document.querySelector("meta[name=viewport]");
      if (meta) {
        meta.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0"
        );
      }
    };

    const handleBlur = () => {
      const meta = document.querySelector("meta[name=viewport]");
      if (meta) {
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
      }
    };

    // MutationObserver to detect inputs dynamically
    const observer = new MutationObserver(() => {
      const inputs = document.querySelectorAll("input, textarea");
      if (inputs.length) {
        inputs.forEach((input) => {
          input.addEventListener("focus", handleFocus);
          input.addEventListener("blur", handleBlur);
        });
        observer.disconnect(); // stop observing once inputs are found
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup on unmount
    return () => {
      const inputs = document.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn’t render anything
}
