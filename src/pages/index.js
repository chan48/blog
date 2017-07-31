// @flow
import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styles from '../styles'
import { rhythm, scale } from '../utils/typography'
import { normalize, fontFace } from 'polished'
import { PageWrapper, PostContentWrapper } from '../components/content-wrapper'
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'
import PostList from '../components/post-list'

class Index extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const siteMetadata = this.props.data.site.siteMetadata

    return (
      <PageWrapper>
        <Helmet
          title={siteMetadata.title}
          meta={[
            { name: 'description', content: `${siteMetadata.description}` },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: `${siteMetadata.url}` },
            { property: 'og:title', content: `${siteMetadata.title}` },
            {
              property: 'og:description',
              content: `${siteMetadata.description}`,
            },
          ]}
          link={[{ rel: 'canonical', href: `${siteMetadata.url}` }]}
        />
        <NavBar />
        <PostContentWrapper>
          <PostList posts={posts} />
        </PostContentWrapper>
        <Footer />
      </PageWrapper>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
        description
        githubUrl
        url
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            mainImage
          }
        }
      }
    }
  }
`
