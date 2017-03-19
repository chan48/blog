import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
// import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import PostList from '../components/PostList';
import styles from './index.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class SiteIndex extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            { name: 'description', content: `${config.siteDesc}` },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: `${config.siteUrl}` },
            { property: 'og:title', content: `${config.siteTitle}` },
            { property: 'og:description', content: `${config.siteDesc}` },
          ]}
          link={[
            { rel: 'canonical', href: `${config.siteUrl}` },
          ]}
        />
        <div className={cx('content')}>
          <div className={cx('main')}>
            <PostList {...this.props} />
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
