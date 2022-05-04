import React from 'react';
import useSWR from 'swr';
import type { FC } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  artists: {
    name: string;
  }[];
  name: string;
};

const Pitchfork: FC<Props> = ({ artists, name }) => {
  const { data } = useSWR(`/api/pitchfork/${artists?.[0]?.name}/${name}`);

  if (!data?.rating) return null;

  return (
    <div className={styles['review']}>
      <p>
        {data?.text}
        &nbsp;
        <a href={data?.url} target="_blank" rel="noreferrer">
          [review here]
        </a>
      </p>
      <span
        className={classNames(
          styles['review__rating'],
          styles[data?.best ? 'review__rating--best' : '']
        )}
      >
        {data?.rating}
      </span>
    </div>
  );
};

export default Pitchfork;
