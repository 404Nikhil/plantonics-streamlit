import { useCallback, useEffect, useRef } from 'react';

export default function useIsMounted() {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const isMounted = useCallback(() => {
    return isMountedRef.current;
  }, []);

  return isMounted();
}
