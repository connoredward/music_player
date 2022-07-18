import React, { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';

import { useForm } from 'utils/useForm';

import styles from './styles.module.scss';

const NavBar: FC = () => {
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
    <div className={styles['nav']}>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange('search')}
          value={music?.search || ''}
          type="text"
          // placeholder="search..."
        />
        <AiOutlineSearch />
      </form>
    </div>
  );
};

export default NavBar;
