// @flow
import React, { Component } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { clearFix } from 'polished';
import styles from '../styles';
import { rhythm, scale } from '../utils/typography';
import { ContentWrapper, PageWrapper } from '../components/content-wrapper';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';
import Tags from '../components/tags';

const PostContentWrapper = ContentWrapper.extend`
  margin-top: ${rhythm(2)};

  ${styles.media.Tablet} {
    width: ${styles.sizes.postWidth};
  }
`

const PostTitle = styled.h1`
  text-align: left;
  font-weight: bold;
`

const PostInfo = styled.div`
  ${clearFix()}
  font-size: 0.9rem;
`

const TagsWrapper = styled.div`
  margin-top: ${rhythm(1/2)};
`

const TimeToRead = styled.div`
`

const Post = styled.article`
  margin-top: ${rhythm(2)};
`

class BlogPostRoute extends Component {
  getScriptSrc() {
    const scripts = [];
    const scriptRegex = /<script[^>].*<\/script>/ig;
    let match = [];

    // get script tags
    while (match) {
      match = scriptRegex.exec(this.props.data.markdownRemark.html);
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
    const post = this.props.data.markdownRemark;
    const siteMetadata = this.props.data.site.siteMetadata;

    return (
      <PageWrapper>
        <NavBar />
        <PostContentWrapper>
          <header>
            <PostTitle>{post.frontmatter.title}</PostTitle>
            <PostInfo>
              {post.frontmatter.date} &middot; 읽기 {post.timeToRead}분
            </PostInfo>
            <TagsWrapper>
              <Tags tags={post.frontmatter.tags} />
            </TagsWrapper>
          </header>

          {/* post는 utils/typograyph.js 에서 사용하는 클래스네임이다 */}
          <Post
            className="post"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <div id="disqus_thread" />
        </PostContentWrapper>
        <Footer></Footer>

        <Helmet
          link={[
            { rel: 'canonical', href: `${siteMetadata.url}${this.props.location.pathname}` },
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
      </PageWrapper>
    )
  }
}

export default BlogPostRoute

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`
