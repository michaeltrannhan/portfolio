"use client";

import { useEffect, useState } from "react";

/** False during SSR + first client paint; true after mount. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
