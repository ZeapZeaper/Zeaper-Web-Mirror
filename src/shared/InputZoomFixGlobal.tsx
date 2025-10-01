/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

export default function InputZoomFixGlobal() {
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

    const attachHandlers = (
      inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      inputs.forEach((input) => {
        if (!(input as any)._zoomHandlerAttached) {
          input.addEventListener("focus", handleFocus);
          input.addEventListener("blur", handleBlur);
          (input as any)._zoomHandlerAttached = true; // mark as handled
          // add text-[56px] class to the input to prevent zoom on focus
          input.classList.add("text-[16px]");
      
        }
      });
    };

    // Initial attach for inputs already in DOM
    attachHandlers(document.querySelectorAll("input, textarea"));

    // Observe body for dynamically added inputs
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const inputs = node.querySelectorAll("input, textarea");
            //@ts-expect-error bypass
            if (inputs.length) attachHandlers(inputs);
            // If the node itself is an input or textarea
            if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
              //@ts-expect-error bypass
              attachHandlers([node as HTMLInputElement | HTMLTextAreaElement]);
              
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      const inputs = document.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
      observer.disconnect();
    };
  }, []);

  return null; // Nothing rendered
}
