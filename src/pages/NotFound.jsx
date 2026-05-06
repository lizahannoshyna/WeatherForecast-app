import React from 'react';
import { Link } from 'react-router-dom';
import { LuWind } from 'react-icons/lu';
import s from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={s.overlay}>
      <div className={s.card}>
        <div className={s.errorCode}>
          404
          <LuWind className={s.windIcon} size={60} />
        </div>

        <h1 className={s.title}>The atmosphere here is empty.</h1>

        <p className={s.description}>
          It looks like this coordinate is off the charts. The weather system
          couldn't find the page you were looking for.
        </p>

        <div className={s.actions}>
          <Link to="/" className={s.primaryBtn}>
            Return to Dashboard
          </Link>
          <Link to="/contacts" className={s.secondaryBtn}>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;