"use client";

import { useEffect, useState } from "react";

/** True when viewport is md+ and primary input is fine pointer (mouse). */
export function useDesktopPointer() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return ok;
}
