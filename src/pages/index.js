import React from 'react';
// import { Link } from 'react-router';
// import { prefixLink } from 'gatsby-helpers';
import Helmet from 'react-helmet';
import { config } from 'config';
import Footer from '../components/Footer';
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
          <PostList {...this.props} />
        </div>
        <Footer {...this.props} />
      </div>
    );
  }
}

SiteIndex.propTypes = {
  route: React.PropTypes.object,
};

export default SiteIndex;
