// @flow
import React from "react"
import Link from "gatsby-link"
import Helmet from 'react-helmet';
import styles from "../styles"
import { rhythm, scale } from "../utils/typography"
import { normalize, fontFace } from 'polished';
import { PageWrapper, ContentWrapper } from '../components/content-wrapper';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';

class Index extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const siteMetadata = this.props.data.site.siteMetadata;

    return (
      <PageWrapper>
        <Helmet
          title={siteMetadata.title}
          meta={[
            { name: 'description', content: `${siteMetadata.description}` },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: `${siteMetadata.url}` },
            { property: 'og:title', content: `${siteMetadata.title}` },
            { property: 'og:description', content: `${siteMetadata.description}` },
          ]}
          link={[
            { rel: 'canonical', href: `${siteMetadata.url}` },
          ]}
        />
        <NavBar />
        <ContentWrapper>
          <ul>
          {posts.map(post =>
            <li key={post.node.fields.slug}>
              <span
                css={{
                  color: styles.colors.light,
                  display: `block`,
                  [styles.media.Tablet]: {
                    float: `right`,
                    marginLeft: `1rem`,
                  },
                }}
              >
                {post.node.frontmatter.date}
              </span>
              <Link to={post.node.fields.slug} className="link-underline">
                {post.node.frontmatter.title}
              </Link>
            </li>
          )}
          </ul>
        </ContentWrapper>
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

