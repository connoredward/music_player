import React, { useState, createContext } from 'react';

import Loader from 'components/modules/Loader';

export const Context = createContext(null) as any;

export const Store = ({ children }): any => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Context.Provider value={{ setIsLoading }}>
      <>
        <Loader isLoading={isLoading} />
        {children}
      </>
    </Context.Provider>
  );
};

export default {
  Context,
  Store,
};
