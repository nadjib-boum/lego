import { useSyncExternalStore } from "react";
import type { Lego, LegoGetter } from "./types";

export function lego<T>(initialValue: T | LegoGetter<T>): Lego<T> {
  let value: T =
    typeof initialValue === "function" ? (null as T) : initialValue;

  const subscribers = new Set<(newValue: T) => void>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribed = new Set<Lego<any>>();

  const get = <U>(lego: Lego<U>) => {
    let currentValue = lego.get();
    if (!subscribed.has(lego)) {
      subscribed.add(lego);
      lego.subscribe((newValue) => {
        if (currentValue === newValue) return; // Memoize current value
        currentValue = newValue;
        computeLegoValue();
      });
    }

    return currentValue;
  };

  const computeLegoValue = async () => {
    const newValue =
      typeof initialValue === "function"
        ? (initialValue as LegoGetter<T>)(get)
        : value;
    value = null as T;
    value = await newValue;
    subscribers.forEach((cb) => cb(value));
  };

  computeLegoValue();

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      computeLegoValue();
    },
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
  };
}

export function useLego<T>(lego: Lego<T>) {
  return [useSyncExternalStore(lego.subscribe, lego.get), lego.set] as const;
}

export function useLegoValue<T>(lego: Lego<T>) {
  const [value] = useLego(lego);
  return value;
}
