import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import styles from './Navigation.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Navigation extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <nav className={cx('wrap')}>
        <div className={cx('navigation')}>
          <h1 className={cx('header')}>Rhostem's note</h1>
        </div>
      </nav>
    );
  }
}
        // <ul className={cx('menuBar')}>
          // <li>
            // <Link
              // to={prefixLink('/')}
              // className={cx('menu')}
              // activeClassName={cx('current')}
              // onlyActiveOnIndex
            // >Articles
            // </Link>
          // </li>
        // </ul>

Navigation.propTypes = {
  location: React.PropTypes.object,
};

export default Navigation;
