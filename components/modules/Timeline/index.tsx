import React, { FC, useState, useContext, useEffect } from 'react';
import { Range } from 'react-range';

import { Context as SongContext } from 'store/song';

import styles from './styles.module.scss';

const SongRange: FC = () => {
  const { duration, event } = useContext(SongContext);

  const [block, setBlock] = useState(undefined);
  const [currentTime, setCurrentTime] = useState([0.1]);

  useEffect(() => {
    const id = setInterval(() => {
      if (event) {
        setCurrentTime([Math.round(event.getCurrentTime())]);
      }
    }, 10);
    return () => clearInterval(id);
  }, [event]);

  function changeCurrentTime(time) {
    if (event) {
      event.seekTo(time);
    }
    setBlock(false);
  }

  function songTime(time) {
    const timeRound = Math.round(time);
    const minute = Math.floor(timeRound / 60);
    const seconds = timeRound - minute * 60;
    return `${minute} : ${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  return (
    <div className={styles['range']}>
      <Range
        onChange={(value) => setBlock(value)}
        onFinalChange={changeCurrentTime}
        values={block ? block : currentTime}
        max={duration || 100}
        min={0}
        step={0.1}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
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
          >
            <div className={styles['times']}>
              <span>{songTime(block || currentTime)}</span>/
              <span>{songTime(duration)}</span>
            </div>
          </div>
        )}
      />

    </div>
  );
}

export default SongRange;
