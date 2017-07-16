import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer';
import PostList from '../components/PostList';
import styles from './index.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class SiteIndex extends React.Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata;

    return (
      <div>
        <Helmet
          title={siteMetadata.title}
          meta={[
            { name: 'description', content: `${siteMetadata.desc}` },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: `${siteMetadata.url}` },
            { property: 'og:title', content: `${siteMetadata.title}` },
            { property: 'og:description', content: `${siteMetadata.desc}` },
          ]}
          link={[
            { rel: 'canonical', href: `${siteMetadata.url}` },
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
  data: React.PropTypes.object,
};

export default SiteIndex;

export const pageQuery = graphql`
  query SiteMetadataLookup($slug: String!) {
    site {
      siteMetadata {
        title
        desc
        url
      }
    }
  }
`;
