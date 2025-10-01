"use client";

import { useEffect } from "react";

export default function InputZoomFix() {
  useEffect(() => {
    const handleFocus = () => {
        console.log("Input focused");
      const meta = document.querySelector('meta[name=viewport]');
      console.log("meta", meta);
      if (meta) {
        meta.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0"
        );
      }
      console.log("meta after focus", meta)
    };

    const handleBlur = () => {
        console.log("Input blurred");
      const meta = document.querySelector('meta[name=viewport]');
      console.log("meta blur", meta);
      if (meta) {
        meta.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0"
        );
      }
      console.log("meta after blur", meta);
    };

    // MutationObserver to detect inputs dynamically
    const observer = new MutationObserver(() => {
      const inputs = document.querySelectorAll("input, textarea");
      console.log("Observed inputs", inputs);
      if (inputs.length) {
        inputs.forEach((input) => {
            
          input.addEventListener("focus", handleFocus);
          input.addEventListener("blur", handleBlur);
          // ensure the text-[16px] class is applied to prevent zoom on focus
          if (!input.classList.contains("text-[16px]")) {
            input.classList.add("text-[16px]");
          }
          console.log("Input event listeners added and class ensured", input);
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
