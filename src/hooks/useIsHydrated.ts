import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// Returns false on the server and during client hydration, then true once
// the component has hydrated. Use it to defer rendering browser-only values
// (such as a zustand store rehydrated from localStorage) until after the
// client mounts, so the server-rendered HTML and the first client render
// stay identical and React does not flag a hydration mismatch.
const useIsHydrated = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

export default useIsHydrated;