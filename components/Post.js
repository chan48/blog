import React from 'react';
import moment from 'moment';
import { RouteHandler, Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import access from 'safe-access';
import { config } from 'config';
import ReadNext from './ReadNext';
import '../static/css/highlight.css';
import './Post.css';

class Post extends React.Component {
  render() {
    const { route } = this.props;
    const post = route.page.data;

    return (
      <div>
        <div className="blog-single">
          <div className="text">
            <h1>{ post.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
            <div className="date-published">
              <em>Published {moment(post.date).format('D MMM YYYY')}</em>
            </div>
          </div>
          <div className="footer">
            <ReadNext post={post} {...this.props} />
            <hr />
            <p>
              &copy; <a href="https://www.github.com/rhostem">rhotsem</a>
              <span>&nbsp;All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
};

export default Post;
