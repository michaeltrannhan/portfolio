"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

/** Pointer position relative to an element, pre-computed in useful spaces. */
export type PointerGeometry = {
  /** Offset from the element's top-left corner, in px. */
  px: number;
  py: number;
  /** Position normalized to 0..1 across the element. */
  nx: number;
  ny: number;
  /** Delta from the element's center, in px. */
  dx: number;
  dy: number;
};

type GeometryOptions = {
  /** When false the handler is a no-op (e.g. touch / reduced motion). */
  enabled?: boolean;
};

/**
 * Core pointer→rect geometry hook. `onMove` receives pre-computed geometry —
 * use it for direct style mutations (no re-render) or fully custom handling.
 */
export function usePointerGeometry(
  onMove: (geometry: PointerGeometry, el: HTMLDivElement) => void,
  { enabled = true }: GeometryOptions = {}
) {
  const ref = useRef<HTMLDivElement>(null);
  // Latest-ref pattern: stable handler identity, always-fresh callback.
  const onMoveRef = useRef(onMove);

  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      onMoveRef.current(
        {
          px,
          py,
          nx: rect.width > 0 ? px / rect.width : 0.5,
          ny: rect.height > 0 ? py / rect.height : 0.5,
          dx: px - rect.width / 2,
          dy: py - rect.height / 2,
        },
        el
      );
    },
    [enabled]
  );

  return { ref, onMouseMove };
}

export type PointerPoint = { x: number; y: number };

/**
 * Pointer position as 0–100% across the element (spotlight / beam gradients).
 * `inside` tracks hover; the last position is kept on leave.
 */
export function usePointerPercent({
  enabled = true,
  initial = { x: 50, y: 40 },
}: GeometryOptions & { initial?: PointerPoint } = {}) {
  const [pos, setPos] = useState<PointerPoint>(initial);
  const [inside, setInside] = useState(false);

  const { ref, onMouseMove } = usePointerGeometry((g) => {
    setPos({ x: g.nx * 100, y: g.ny * 100 });
    setInside(true);
  }, { enabled });

  const onMouseLeave = useCallback(() => setInside(false), []);

  return { ref, pos, inside, bind: { onMouseMove, onMouseLeave } };
}

/**
 * Pointer position normalized to 0..1 (tilt / parallax offsets).
 * Leaving recenters to {0.5, 0.5} so derived transforms settle back to rest.
 */
export function usePointerNormalized({ enabled = true }: GeometryOptions = {}) {
  const [pos, setPos] = useState<PointerPoint>({ x: 0.5, y: 0.5 });
  const [inside, setInside] = useState(false);

  const { ref, onMouseMove } = usePointerGeometry((g) => {
    setPos({ x: g.nx, y: g.ny });
    setInside(true);
  }, { enabled });

  const onMouseLeave = useCallback(() => {
    setPos({ x: 0.5, y: 0.5 });
    setInside(false);
  }, []);

  return { ref, pos, inside, bind: { onMouseMove, onMouseLeave } };
}

/**
 * Offset pulled from the element center (magnetic hover), scaled by strength.
 * Pair with `magneticSpring` from @/components/motion for the canonical feel.
 */
export function useMagneticOffset({
  strength = 0.28,
  enabled = true,
}: GeometryOptions & { strength?: number } = {}) {
  const [offset, setOffset] = useState<PointerPoint>({ x: 0, y: 0 });

  const { ref, onMouseMove } = usePointerGeometry((g) => {
    setOffset({ x: g.dx * strength, y: g.dy * strength });
  }, { enabled });

  const onMouseLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return { ref, offset, bind: { onMouseMove, onMouseLeave } };
}
