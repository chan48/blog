import React, { PropTypes } from 'react';
import styles from './Footer.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Footer({}) {
  return (
    <div className={cx('wrap')}>
      <div className={cx('Footer')}>
        <div className={cx('copyright')}
        >@2016 <a className={cx('owner')} href="https://www.github.com/rhostem" target="blank">rhostem</a> All rights reserved</div>

        <div className={cx('Footer-links')}>
          <a href="https://www.github.com/rhostem">
            <i className="fa fa-github" />
          </a>
          <a href="mailto:syoung.j@gmail.com">
            <i className="fa fa-envelope-o" />
          </a>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
};

export default Footer;
