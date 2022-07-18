import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { GrHomeRounded, GrArchive } from 'react-icons/gr';
import { AiOutlineHeart } from 'react-icons/ai';

import styles from './styles.module.scss';

const SideBar: FC = () => {
  const router = useRouter();
  return (
    <div className={styles['side']}>
      <h1>Msuci_pl.</h1>
      <span>Menu</span>
      <ul className={styles['side__menu']}>
        <li
          className={classnames(
            styles['menu__link'],
            styles[Object.keys(router?.query)?.length === 0 ? 'menu__link--active' : '']
          )}
        >
          <button type="button" onClick={() => router.push('/')}>
            <GrHomeRounded />
            Home
          </button>
        </li>
        <li
          className={classnames(
            styles['menu__link'],
            styles[Object.keys(router?.query).includes('history') ? 'menu__link--active' : '']
          )}
        >
          <button type="button" onClick={() => router.push('/?history')}>
            <GrArchive />
            History
          </button>
        </li>
        <li
          className={classnames(
            styles['menu__link'],
            styles[Object.keys(router?.query).includes('favourites') ? 'menu__link--active' : '']
          )}
        >
          <button type="button" onClick={() => router.push('/?favourites')}>
            <AiOutlineHeart />
            Favourites
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
