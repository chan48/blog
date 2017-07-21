// @flow
import React, { Component } from 'react';
import Link from 'gatsby-link';
import styles from '../styles';
import { rhythm, scale } from '../utils/typography';
import { ContentWrapper, PageWrapper } from '../components/content-wrapper';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';
import Tags from '../components/Tags';

class BlogPostRoute extends Component {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <PageWrapper>
        <NavBar />
        <ContentWrapper>
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
        </ContentWrapper>
        <Footer></Footer>
      </PageWrapper>
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
