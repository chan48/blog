import React, { PropTypes } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import Helmet from 'react-helmet';
// import { RouteHandler, Link } from 'react-router';
// import access from 'safe-access';
// import { config } from 'config';
import ReadNext from './ReadNext';
import Tags from './Tags';

import '../static/css/highlight.css';
import './Post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);
    moment.locale();
  }
  render() {
    const { route } = this.props;
    const post = route.page.data;
    const tags = post.tags && post.tags.split(',');

    const scripts = [];
    const scriptRegex = /<script[^>].*<\/script>/ig;
    let match = [];

    // get script tags
    while (match) {
      match = scriptRegex.exec(post.body);
      if (match) {
        scripts.push(match[0]);
      } else {
        break;
      }
    }
    // parse src from script tags
    const scriptSrc = scripts.map((script) => {
      return /(src=)"(.+)"/.exec(script)[2];
    });

    return (
      <div>
        <Helmet>
          {scriptSrc.map((src) =>
            <script async src={src} type="text/javascript" />
          )}
        </Helmet>
        <div className="blog-single">
          <div className="text">
            <h1>{ post.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
          <div className="footer">
            <ReadNext post={post} {...this.props} />
            <div>
              {tags && <Tags tags={tags} />}
            </div>
            <div className="date-published">
              {moment(post.date).format('LL')}
            </div>
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
  pages: React.PropTypes.array,
  route: PropTypes.object,
  RouteHandler: PropTypes.object,
  Link: PropTypes.object,
  config: PropTypes.object,
};

export default Post;
