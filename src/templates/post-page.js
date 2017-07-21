// @flow
import React, { Component } from 'react';
import Link from 'gatsby-link';
import styles from '../styles';
import { rhythm, scale } from '../utils/typography';
import presets from '../utils/presets';
import Tags from '../components/Tags';

class BlogPostRoute extends Component {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <div
        css={{
          maxWidth: rhythm(26),
        }}
      >
        <header>
          <h1>
            {post.frontmatter.title}
          </h1>
          <p>
            {post.timeToRead} min read &middot;
          </p>
          <Tags tags={post.frontmatter.tags} />
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} className="post" />
        <hr />
      </div>
    )
  }
}

export default BlogPostRoute

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date(formatString: "YYYY-MM-DD, ")
      }
    }
  }
`
