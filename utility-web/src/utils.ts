import React, { useRef, useEffect } from "react";

export const parseTimeToString = (second: number) => {
  let str: any = "";

  const b = second / 60;
  const h = b / 60;
  const m = b % 60;
  const s = second % 60;

  const hf = Math.floor(h);
  const mf = Math.floor(m);
  const sf = Math.floor(s);

  if (hf > 0) {
    str = hf + "시 ";
  }
  if (mf > 0) {
    str = str + mf + "분 ";
  }
  if (sf > 0) {
    str = str + sf + "초";
  }

  return str;
};

// Hook
export const useEventListener = (
  eventName: string,
  handler: any,
  element: any
) => {
  // Create a ref that stores handler
  const savedHandler = useRef<any>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event: any) => savedHandler!.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
