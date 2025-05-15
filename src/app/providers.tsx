'use client';

import React, { useEffect, useState } from 'react';

export default function Providers({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // This ensures that any components that require client-side rendering
  // (like modals using createPortal) will only be rendered after
  // the component has mounted on the client.
  return <>{mounted ? children : null}</>;
} 