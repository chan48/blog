// @flow
import React, { Component } from 'react';
import Link from 'gatsby-link';
import styles from '../styles';
import { rhythm, scale } from '../utils/typography';
import presets from '../utils/presets';
import Tags from '../components/Tags';

class BlogPostRoute extends Component {
  render() {
    const post = this.props.data.markdownRemark


    // let tags
    // let tagsSection
    // if (post.fields.tagSlugs) {
    //   const tagsArray = post.fields.tagSlugs
    //   tags = tagsArray.map((tag, i) => {
    //     const divider = i < tagsArray.length - 1 && <span>{`, `}</span>
    //     return (
    //       <span key={tag}>
    //         <Link to={tag}>
    //           {post.frontmatter.tags[i]}
    //         </Link>
    //         {divider}
    //       </span>
    //     )
    //   })
    //   tagsSection = (
    //     <span
    //       css={{
    //         fontStyle: `normal`,
    //         textAlign: `left`,
    //       }}
    //     >
    //       tagged {tags}
    //     </span>
    //   )
    // }

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
