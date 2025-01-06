import type { EffectCallback } from "react";
import { useEffect, useRef } from "react";

export function useEffectOnce(effect: EffectCallback) {
  const isFirstMount = useRef(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;

      return effect();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
