import React, { useContext, useState } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Artists from 'components/modules/Artists';

import { Context as SongContext } from 'store/song';
import { Context as YoutubeContext } from 'store/youtube';

import styles from './styles.module.scss';

type Props = {
  album: {
    id: string;
    name: string;
    images: {
      url: string;
    }[];
  };
  name: string;
  artists: {
    id: string;
    name: string;
  }[];
  favourites: any;
};

const FavouriteCard: FC<Props> = (props) => {
  const { album, name, artists, favourites } = props;
  const [disabled, setDisabled] = useState(false);

  const { setCurrentSong, setCurrentAlbum, currentSong } = useContext(SongContext);
  const { getId } = useContext(YoutubeContext);

  const router = useRouter();

  const searchSong = async () => {
    setDisabled(true);
    setCurrentSong({
      ...props,
      img: album?.images?.[0]?.url,
      videoId: await getId(`${artists?.[0]?.name} - ${name} song`),
    });
    setCurrentAlbum({
      ...favourites,
      tracks: {
        ...favourites.tracks,
        items: favourites?.tracks?.items?.map((i) => ({ ...i, ...i.track })),
      },
    });
    setTimeout(() => setDisabled(false), 1000);
  };

  return (
    <button type="button" onClick={searchSong} className={styles['favourite']} disabled={disabled}>
      <button
        type="button"
        onClick={(e) => router.push(`/?album=${album?.id}`)}
        className={styles['favourite__img']}
      >
        <Image
          alt={album?.name}
          src={album?.images?.[0]?.url}
          width={50}
          height={50}
          blurDataURL={album?.images?.[2]?.url}
          placeholder="blur"
        />
      </button>

      <div>
        <span>{name} - </span>
        <span>{album?.name}</span>

        <Artists {...props} />
      </div>
    </button>
  );
};

export default FavouriteCard;
