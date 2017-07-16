import React, { PropTypes } from 'react';
// import moment from 'moment';
// import { RouteHandler, Link } from 'react-router';
// import { config } from 'config';
// import Sidebar from './Sidebar';
import './Page.css';

class Page extends React.Component {
  render() {
    const { route } = this.props;
    const post = route.page.data;

    return (
      <div>
        <div className="content">
          <div className="main">
            <div className="main-inner">
              <div className="blog-page">
                <div className="text">
                  <h1>{ post.title }</h1>
                  <div dangerouslySetInnerHTML={{ __html: post.body }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  post: PropTypes.object.isRequired,
  pages: PropTypes.array,
  route: PropTypes.object.isRequired,
};

export default Page;
