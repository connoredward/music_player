import React, { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useForm } from 'utils/useForm';

import styles from './styles.module.scss';

const Form: FC = () => {
  const router = useRouter();
  const timerRef = useRef(null);

  const {
    handleSubmit,
    handleChange,
    data: music,
  } = useForm<{ search: string }>({
    validations: {
      search: {
        required: {
          value: true,
          message: '',
        },
      },
    },
    onSubmit: () => {
      router.push({ pathname: '/', query: { search: music?.search } });
    },
  });

  useEffect(() => {
    // If any changes in input then wait before searching.
    if (music?.search) {
      if (timerRef?.current) clearTimeout(timerRef?.current);
      timerRef.current = setTimeout(() => {
        router.push({ pathname: '/', query: { search: music?.search } });
      }, 500);
    }
  }, [music?.search]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange('search')}
        value={music?.search || ''}
        type="text"
        placeholder="search..."
      />
    </form>
  );
};

const NavBar: FC = () => (
  <div className={styles['nav']}>
    <Link href={{ pathname: '/', query: {} }} prefetch={false} passHref>
      <a href="null">
        <h1>
          msuci_pl<span>.</span>
        </h1>
        <h1 className={styles['mobile']}>
          M<span>.</span>
        </h1>
      </a>
    </Link>
    <Form />
  </div>
);

export default NavBar;
