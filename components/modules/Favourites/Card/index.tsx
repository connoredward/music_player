import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

const FavoriteCard: FC = () => {
  const router = useRouter();
  return (
    <div className={styles['favourites']}>
      <div className={styles['favourites__bg']} />
      <div className={styles['favourites__content']}>
        <span>FAVOURITES</span>
        <p>Listen to my favourites of all time</p>
        <button type="button" onClick={() => router.push('/?favourites')}>
          Check them out
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;
