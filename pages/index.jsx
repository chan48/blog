import React from 'react';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import Helmet from 'react-helmet';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import access from 'safe-access';
// import Post from '../components/Post';
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';
import styles from './index.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class SiteIndex extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={config.siteTitle} />
        <Sidebar {...this.props} />
        <div className={cx('content')}>
          <div className={cx('main')}>
            <div className={cx('main-inner')}>
              <PostList {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SiteIndex.propTypes = {
  route: React.PropTypes.object,
};

export default SiteIndex;
