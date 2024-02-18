import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import useIsMounted from '@/utils/hooks/useIsMounted';

/**
 * HOC Wrapper for client rendered componenent using windows for useLayoutEffect
 *
 * @param Component
 * @returns
 */
const withClientRender = <P extends object>(Component: NextPage<P>) => {
  return (pageProps: P) => {
    const [showChild, setShowChild] = useState(false);

    const isMounted = useIsMounted();

    useEffect(() => {
      if (isMounted) {
        setShowChild(true);
      }
    }, []);

    if (!showChild) return null;

    return <Component {...pageProps} />;
  };
};

export default withClientRender;
