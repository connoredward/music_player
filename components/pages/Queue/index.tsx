import React, { useContext } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { MdArchive } from 'react-icons/md';
import dynamic from 'next/dynamic';

import { Context as QueueContext } from 'store/queue';

import styles from './styles.module.scss';

const QueueCard = dynamic(() => import('components/modules/Cards/Queue'));

const QueuePage: FC = () => {
  const router = useRouter();
  const { queue } = useContext(QueueContext);

  if (!router?.query?.queue) return null;

  return (
    <div className={styles['queue']}>
      <span className={styles['queue__header']}>My Queue</span>
      {queue?.length > 0
        ? (
          <div>
            {queue?.map((i) => <QueueCard key={i?.id} {...i} />)}
          </div>
        ) : <div><MdArchive /></div>
      }
    </div>
  );
};

export default QueuePage;
