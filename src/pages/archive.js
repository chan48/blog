// @flow
import React, { Component } from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import styles from '../styles'
import { clearFix } from 'polished'
import { rhythm } from '../utils/typography'
import { PageWrapper, PostContentWrapper } from '../components/content-wrapper'
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'
import Tags from '../components/tags'
import R from 'ramda'

const Title = styled.h1`
  font-family: 'Noto Sans Kr';
  font-size: 2.5rem;
  font-weight: 100;
  line-height: ${rhythm(2)};
  margin-top: ${rhythm(2)};
`

type PostNode = {
  fields: {
    slug: string,
  },
  frontmatter: {
    title: string,
    date: string,
  },
}
type Edge = {
  node: PostNode,
}
type props = {
  data: {
    allMarkdownRemark: {
      edges: Array<Edge>,
    },
    site: any,
  },
}

type PostByYear = Array<{
  year: string,
  posts: Array<PostNode>,
}>

const YearArchive = styled.ul`
  margin: ${rhythm(2)} 0;
  list-style-type: disc;
`

const YearTitle = styled.h2`
  position: relative;
  padding-left: 1rem;
  margin-top: ${rhythm(1)};
  margin-bottom: ${rhythm(1)};
  font-family: 'Noto Sans Kr';
  font-weight: 400;

  &::before {
    position: absolute;
    content: ' ';
    top: 0.7rem;
    left: 0;
    width: 5px;
    height: 1.7rem;
    background-color: #4568dc;
  }
`

const PostTitleLink = styled(Link)`
  position: relative;
  list-style: disc;
  display: block;
  margin: ${rhythm(0.5)} 0 ${rhythm(0.5)} 0.5rem;
  padding-left: 0.8rem;

  &::before {
    position: absolute;
    content: ' ';
    top: 0.65rem;
    left: 0;
    width: 0.3rem;
    height: 0.3rem;
    background-color: #4568dc;
    opacity: 0.6;
    border-radius: 2px;
  }

  &:hover {
    color: ${styles.colors.linkHover};
  }
`

class ArchiveRoute extends Component {
  postByYear: PostByYear = []

  constructor(props: props) {
    super(props)
  }

  componentDidMount() {}

  makePostByYear() {
    const posts: Array<PostNode> = this.props.data.allMarkdownRemark.edges.map(
      (e: Edge) => e.node,
    )
    const getYearFromDate = (year: string) => year.slice(0, 4)

    const parseDecimal = R.unary(parseInt)
    const sortDesc = (a, b) => parseDecimal(b) - parseDecimal(a)

    const allYears = R.pipe(
      R.map(p => p.frontmatter.date),
      R.map(getYearFromDate),
      R.uniq,
    )(posts).sort(sortDesc)

    const yearlyPosts = (year: string, allPosts) => {
      return allPosts.filter(
        (post: PostNode) => year === getYearFromDate(post.frontmatter.date),
      )
    }

    this.postByYear = allYears.map(year => ({
      year,
      posts: yearlyPosts(year, posts).sort((pA: PostNode, pB: PostNode) => {
        const dateA = +new Date(pA.frontmatter.date)
        const dateB = +new Date(pB.frontmatter.date)
        return dateB - dateA
      }),
    }))
  }

  render() {
    // const post = this.props.data.allMarkdownRemark
    const siteMetadata = this.props.data.site.siteMetadata
    this.makePostByYear()

    return (
      <PageWrapper>
        <NavBar />
        <PostContentWrapper>
          <Title>ARCHIVE</Title>

          {this.postByYear.map(item =>
            <YearArchive key={item.year}>
              <YearTitle>
                {item.year}
              </YearTitle>
              {item.posts.map(post =>
                <PostTitleLink to={post.fields.slug}>
                  {post.frontmatter.title}
                </PostTitleLink>,
              )}
            </YearArchive>,
          )}
        </PostContentWrapper>
        <Footer />
        <Helmet
          description="연도별 포스트 목록"
          link={[
            {
              rel: 'canonical',
              href: `${siteMetadata.url}/archive`,
            },
          ]}
        />
      </PageWrapper>
    )
  }
}

export default ArchiveRoute

export const pageQuery = graphql`
  query ArchivePostBySlug {
    site {
      siteMetadata {
        title
        url
        author
        url
      }
    }
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
          }
        }
      }
    }
  }
`
