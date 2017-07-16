import React, { PropTypes } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import Helmet from 'react-helmet';
// import ReadNext from './ReadNext';
import Tags from './Tags';
import Footer from './Footer';

import '../css/highlight.css';
import './Post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);
    moment.locale();
    this.getScriptSrc = this.getScriptSrc.bind(this);
  }

  getScriptSrc() {
    const scripts = [];
    const scriptRegex = /<script[^>].*<\/script>/ig;
    let match = [];

    // get script tags
    while (match) {
      match = scriptRegex.exec(this.props.route.page.data.body);
      if (match) {
        scripts.push(match[0]);
      } else {
        break;
      }
    }

    // parse src from script tags
    return scripts.map((script) => {
      return /(src=)"(.+)"/.exec(script)[2];
    });
  }

  render() {
    const { route } = this.props;
    const post = route.page.data;
    const tags = post.tags;
    const siteMetadata = this.props.data.site.siteMetadata;

    return (
      <div>
        <Helmet
          link={[
            { rel: 'canonical', href: `${siteMetadata.url}${post.path}/` },
          ]}
        >
          {this.getScriptSrc().map((src, i) =>
            <script async src={src} type="text/javascript" key={i} />
          )}

          {/* Disqus 댓글
          https://rhostem.disqus.com/admin/settings/universalcode/*/}
          <script type="text/javascript">{`
            /**
             *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
             *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
             */
            /*
            var disqus_config = function () {
                this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
                this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
            };
            */
            (function() {  // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');

                s.src = 'https://rhostem.disqus.com/embed.js';

                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();
          `}</script>

          <noscript>{`
            Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a>
          `}</noscript>

        </Helmet>
        <div className="content">
          <div className="Post">
            <div className="Post-text">
              <h1>{ post.title }</h1>
              <div className="Post-postDesc">
                {tags && <Tags tags={tags} />}
                <div className="date-published">
                  {moment(post.date).format('LL')}
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>

            <div className="Post-disqus" id="disqus_thread" />

          </div>
        </div>
        <Footer {...this.props} />
      </div>
    );

            // <div className="footer">
            //   <ReadNext post={post} {...this.props} />
            // </div>
  }
}

Post.propTypes = {
  pages: React.PropTypes.array,
  route: PropTypes.object,
  RouteHandler: PropTypes.object,
  Link: PropTypes.object,
  data: React.PropTypes.object,
};

export default Post;

export const pageQuery = graphql`
  query SiteMetadataLookup($slug: String!) {
    site {
      siteMetadata {
        url
      }
    }
  }
`;

