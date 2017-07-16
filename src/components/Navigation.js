import React from 'react';
import { Link } from 'react-router';
// import { prefixLink } from 'gatsby-helpers';
import styles from './Navigation.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Navigation extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <nav className={cx('wrap')}>
        <div className={cx('navigation')}>
          <Link to={'/'}>
            <h1 className={cx('header')}>rhostem.github.io</h1>
          </Link>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  location: React.PropTypes.object,
};

export default Navigation;
