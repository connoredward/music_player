import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = {
  artists: {
    name: string;
  }[];
  className?: string;
};

const ArtistMap: FC<Props> = ({ artists, className }) => (
  <p className={classNames(styles['artists'], className)}>
    {artists?.map(({ name }, index, arr) => (
      <span key={name}>
        <Link href={{ pathname: '/', query: { search: name } }} prefetch={false} passHref>
          <a href="null" onClick={(e) => e.stopPropagation()}>
            {name}
          </a>
        </Link>
        {arr?.length === 1
          ? ''
          : index === 0 && arr.length > 0
          ? ' ft. '
          : index + 1 === arr.length
          ? ''
          : ', '}
      </span>
    ))}
  </p>
);

export default ArtistMap;
