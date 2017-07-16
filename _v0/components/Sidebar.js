import React from 'react';
import Link from 'gatsby-link';
import Navigation from './Navigation';
import SiteLinks from './SiteLinks';
import './Sidebar.css';
// import profilePic from '../../pages/photo.jpg';

class Sidebar extends React.Component {
  render() {
    // const { location, children } = this.props;
    // const isHome = location.pathname === '/';
    const siteMetadata = this.props.data.site.siteMetadata;

    const header = (
      <header>
        <h1>
          <Link
            style={{
              fontSize: '2em',
              textDecoration: 'none',
              borderBottom: 'none',
              outline: 'none',
            }}
            to={'/'}
          >
            Rhostem's note
          </Link>
        </h1>
        <h2>
          <Link
            style={{
              textDecoration: 'none',
              borderBottom: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >{ siteMetadata.author }</Link>
        </h2>
        <p>
          { siteMetadata.descr }
        </p>
      </header>
    );

    return (
      <div className="sidebar">
        <div className="sidebar-inner">
          <div className="blog-details">
            <header>
              { header }
            </header>
          </div>
          <div className="blog-options">
            <Navigation {...this.props} />
            <footer>
              <SiteLinks {...this.props} />
              <p className="copyright">
                &copy; <a href="https://www.github.com/rhostem">rhotsem</a>
                <span>&nbsp;All rights reserved.</span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  data: React.PropTypes.object,
};

export default Sidebar;

export const pageQuery = graphql`
  query SiteMetadataLookup($slug: String!) {
    site {
      siteMetadata {
        author
        desc
      }
    }
}
`;
