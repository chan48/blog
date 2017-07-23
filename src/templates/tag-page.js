import React from "react"
import Link from "gatsby-link"
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { clearFix } from 'polished';
import { rhythm } from '../utils/typography';
import { PageWrapper, PostContentWrapper } from '../components/content-wrapper';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';
import PostList from '../components/post-list';

const TagTitle = styled.header`
  font-family: 'Noto Sans Kr';
  font-size: 2.5rem;
  font-weight: 100;
  line-height: ${rhythm(2)};
`
const ShowAllTags = styled.span`
  font-family: 'Noto Sans Kr';
  font-weight: 100;
`

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post =>
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          {post.node.frontmatter.title}
        </Link>
      </li>
    )

    return (
      <PageWrapper>
        <NavBar />
        <PostContentWrapper>
          <TagTitle>
            {this.props.pathContext.tag}
            <span> - </span>
            {this.props.data.allMarkdownRemark.totalCount}개의 글
          </TagTitle>
          <PostList posts={posts} />
          <ShowAllTags>
            <Link to="/tags/">모든 태그 보기</Link>
          </ShowAllTags>
        </PostContentWrapper>
        <Footer />
      </PageWrapper>
    )
  }
}

export default TagRoute

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] } },
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            mainImage
          }
        }
      }
    }
  }
`

// draft: { ne: true }
