import './App.css';

import { useEffect, useReducer } from 'react';
import { formatTime } from './helpers/formatTime';
import { newYearsDate } from './helpers/constants';

interface IState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function App() {
  const [state, setState] = useReducer(
    (state: IState, newState: IState): IState => ({ ...state, ...newState }),
    { days: 0, hours: 0, minutes: 0, seconds: 0 }
  );

  const countdown = () => {
    const totalSeconds = (newYearsDate.valueOf() - new Date().valueOf()) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    setState({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    countdown();
    const id = setInterval(countdown, 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = state;

  return (
    <>
      <h1>New Year's Eve</h1>
      <div className="countdown-container">
        <div className="countdown-el days-c">
          <p className="big-text">{days}</p>
          <span>days</span>
        </div>
        <div className="countdown-el hours-c">
          <p className="big-text">{formatTime(hours)}</p>
          <span>hours</span>
        </div>
        <div className="countdown-el mins-c">
          <p className="big-text">{formatTime(minutes)}</p>
          <span>mins</span>
        </div>
        <div className="countdown-el seconds-c">
          <p className="big-text">{formatTime(seconds)}</p>
          <span>seconds</span>
        </div>
      </div>
    </>
  );
}

export default App;
