// @flow
import React, { Component } from 'react';
import Link from 'gatsby-link';
import styles from '../styles';
import { rhythm, scale } from '../utils/typography';
import presets from '../utils/presets';

class BlogPostRoute extends Component {
  render() {
    const post = this.props.data.markdownRemark

    let tags
    let tagsSection
    if (post.fields.tagSlugs) {
      const tagsArray = post.fields.tagSlugs
      tags = tagsArray.map((tag, i) => {
        const divider = i < tagsArray.length - 1 && <span>{`, `}</span>
        return (
          <span key={tag}>
            <Link to={tag}>
              {post.frontmatter.tags[i]}
            </Link>
            {divider}
          </span>
        )
      })
      tagsSection = (
        <span
          css={{
            fontStyle: `normal`,
            textAlign: `left`,
          }}
        >
          tagged {tags}
        </span>
      )
    }

    return (
      <div
        css={{
          maxWidth: rhythm(26),
        }}
      >
        <header>
          <h1
            css={{
              marginBottom: rhythm(1 / 6),
              color: post.frontmatter.shadow,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            css={{
              ...scale(-1 / 5),
              display: `block`,
              color: `${styles.colors.light}`,
            }}
          >
            {post.timeToRead} min read &middot; {tagsSection}
          </p>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} className="post" />
        <hr
          css={{
            marginBottom: rhythm(1),
            marginTop: rhythm(2),
          }}
        />
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
