import React, { useContext, useState } from 'react';
import type { FC } from 'react';
import { Range, Direction } from 'react-range';
import { MdVolumeMute, MdVolumeOff, MdVolumeUp, MdVolumeDown } from 'react-icons/md';

import { Context as SongContext } from 'store/song';

import styles from './styles.module.scss';

const VolumeController: FC = () => {
  const { event } = useContext(SongContext);

  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([100]);

  const muteSong = () => {
    event.mute();
    setIsMuted(true);
  };

  const unMuteSong = () => {
    event.unMute();
    setIsMuted(false);
  };

  const changeVolume = (vol) => {
    if (event) {
      event.setVolume(vol);
      setVolume(vol);
    }
  };

  return (
    <div className={styles['volume']}>
      <div className={styles['volume__tool_tip']}>
        <Range
          onChange={changeVolume}
          values={volume}
          max={100}
          min={0}
          step={5}
          direction={Direction.Up}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '100%',
                width: '6px',
                backgroundColor: '#ccc',
                borderRadius: '100px',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '12px',
                width: '12px',
                // backgroundColor: '#66CDAA',
                backgroundColor: 'rgb(218, 242, 35)',
                borderRadius: '100px',
              }}
            />
          )}
        />
      </div>

      {isMuted ? (
        <button type="button" onClick={unMuteSong}>
          <MdVolumeOff />
        </button>
      ) : (
        <button type="button" onClick={muteSong}>
          {volume[0] > 70 ? <MdVolumeUp /> : volume[0] > 40 ? <MdVolumeDown /> : <MdVolumeMute />}
        </button>
      )}
    </div>
  );
};

export default VolumeController;
