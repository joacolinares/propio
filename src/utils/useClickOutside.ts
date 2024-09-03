"use client"
import { useEffect } from "react";

export function useClickOutside(elementSelector: string, callback: () => void) {
  useEffect(() => {
    function onClick(ev: MouseEvent) {
      const element = document.querySelector(elementSelector);
      if (element && ev.target instanceof Node && element.contains(ev.target))
        return;
      callback();
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [elementSelector, callback]);
}