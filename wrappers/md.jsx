import React from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';
import Post from '../components/Post';
import Page from '../components/Page';
import SamplePage from '../components/SamplePage';

class MarkdownWrapper extends React.Component {
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
            { property: 'og:type', content: 'article' },
            { name: 'google-site-verification', content: 'HZS4pN5-8-N7GBYIuK0Il6fy2644h8iqxwkeTBbSFcA' },
            { name: 'description', content: `${post.tags}` },
            { property: 'og:title', content: `${post.title}` },
            { property: 'og:description', content: `${post.tags}` },
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
