import React, { useContext, useState, useEffect } from 'react';
import type { FC } from 'react';
import { MdOutlineQueueMusic } from 'react-icons/md';
import classNames from 'classnames';
import Link from 'next/link';

import { Context as QueueContext } from 'store/queue';

import styles from './styles.module.scss';

const AddQueue: FC = () => {
  const [anim, setAnim] = useState(false);

  const { queue } = useContext(QueueContext);

  useEffect(() => {
    if (queue?.length > 0) {
      setAnim(true);
      setTimeout(() => setAnim(false), 500);
    }
  }, [queue]);

  return (
    <Link href="/?queue" prefetch={false} passHref>
      <a href="null" className={classNames(styles['cta'], styles[anim ? 'cta--anim' : ''])}>
        <MdOutlineQueueMusic />
      </a>
    </Link>
  );
};

export default AddQueue;
