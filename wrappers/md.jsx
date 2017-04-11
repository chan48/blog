import React from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';
import Post from '../components/Post';
import Page from '../components/Page';
import SamplePage from '../components/SamplePage';

class MarkdownWrapper extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { route } = this.props;
    const post = route.page.data;
    const layout = post.layout;
    let template;

    switch (layout) {
      case 'post':
        template = <Post {...this.props} />;
        break;

      case 'page':
        template = <Page {...this.props} />;
        break;

      case 'sample':
        template = <SamplePage {...this.props} />;
        break;

      default:
        break;
    }

    return (
      <div>
        <Helmet
          title={`${post.title} - ${config.siteTitle}`}
          meta={[
            { name: 'description', content: `${post.description} / ${post.tags}` },
            { property: 'og:title', content: `${post.title}` },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: `${post.mainImage}` },
            { property: 'og:description', content: `${post.description} / ${post.tags}` },
            { property: 'og:article:tag', content: `${post.tags}` },
            { property: 'og:article:section', content: '웹 개발' },
            { name: 'google-site-verification', content: 'HZS4pN5-8-N7GBYIuK0Il6fy2644h8iqxwkeTBbSFcA' },
          ]}
          link={[
            { rel: 'canonical', href: `${config.siteUrl}` },
          ]}
        />
        { template }
      </div>
    );
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
};

export default MarkdownWrapper;
