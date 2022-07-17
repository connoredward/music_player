import React from 'react';
import type { FC } from 'react';
import { Rings } from 'react-loader-spinner';

import styles from './styles.module.scss';

type Props = {
  isLoading?: boolean;
};

const Loader: FC<Props> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className={styles['loader']}>
      <Rings color="#DAF223" height={40} width={40} />
    </div>
  );
};

export default Loader;
