import React from 'react';
import './SiteLinks.css';

class SiteLinks extends React.Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata;

    return (
      <div className="blog-social">
        <ul>
          <li>
            <a href={siteMetadata.githubUrl}><i className="fa fa-github-alt" /></a>
          </li>
          <li>
            <a href={siteMetadata.emailUrl}><i className="fa fa-envelope-o" /></a>
          </li>
          <li>
            <a href={siteMetadata.rssUrl}><i className="fa fa-rss" /></a>
          </li>
        </ul>
      </div>
    );
  }
}

SiteLinks.propTypes = {
  data: React.PropTypes.object,
};

export default SiteLinks;

export const pageQuery = graphql`
  query SiteMetadataLookup($slug: String!) {
    site {
      siteMetadata {
        githubUrl
        emailUrl
        rssUrl
      }
    }
}
`;
