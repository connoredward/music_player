import React from 'react';
import type { FC, PropsWithChildren } from 'react';

import Controls from 'components/modules/Controls';

import styles from './styles.module.scss';

type Props = {
  SideContent?: JSX.Element;
};

const LayoutCols: FC<PropsWithChildren<Props>> = ({ children, SideContent }) => (
  <div>
    <div className={styles['home__content']}>
      <div className={styles['content__left']}>{children}</div>

      <div className={styles['content__right']}>
        {SideContent}
        <Controls />
      </div>
    </div>
  </div>
);

export default LayoutCols;
