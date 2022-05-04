import React, { useState, createContext, useEffect } from 'react';

export const Context = createContext(null) as any;

export const Store = ({ children }): any => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    setQueue(JSON.parse(localStorage.getItem('queue') || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('queue', JSON.stringify(queue));
  }, [queue]);

  const addQueue = (props) =>
    (e) => {
      e.stopPropagation();
      if (queue?.find(({ id }) => id === props?.id)) return;
      setQueue((cur) => [...cur, props]);
    };

  const deleteQueue = (props) => {
    setQueue((cur) => cur.filter(({ id }) => id !== props.id));
  };

  return (
    <Context.Provider value={{ queue, addQueue, deleteQueue }}>
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Store,
};
