import React from 'react';
import styles from './styles';

const Body = function({children}) {

  return (
    <main className="main-body">
      {children}
    </main>
  );
}

export default Body;