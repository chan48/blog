import React, { PropTypes } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import Helmet from 'react-helmet';
// import { RouteHandler, Link } from 'react-router';
// import access from 'safe-access';
// import { config } from 'config';
import ReadNext from './ReadNext';
import Tags from './Tags';
import Footer from './Footer';

import '../css/highlight.css';
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
          {scriptSrc.map((src, i) =>
            <script async src={src} type="text/javascript" key={i} />
          )}
        </Helmet>
        <div className="content">
          <div className="Post">
            <div className="text">
              <h1>{ post.title }</h1>
              <div className="Post-postDesc">
                {tags && <Tags tags={tags} />}
                <div className="date-published">
                  {moment(post.date).format('LL')}
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
            <div className="footer">
              <ReadNext post={post} {...this.props} />
            </div>
          </div>
        </div>
        <Footer {...this.props} />
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
