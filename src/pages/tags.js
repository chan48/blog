// @flow
import React, { Component } from 'react';
import R from 'ramda';
import Link from 'gatsby-link';
import _ from 'lodash'
import styled from 'styled-components';
import { rhythm } from '../utils/typography';
import { PageWrapper, PostContentWrapper } from '../components/content-wrapper';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';

import Tags from '../components/tags';

export type Tag = {
  name: string,
  count: number,
};

const Title = styled.h1`
  font-family: 'Noto Sans Kr';
  font-size: 2.5rem;
  font-weight: 100;
  line-height: ${rhythm(2)};
  margin-top: ${rhythm(2)};
`

/**
 * 모든 태그 목록
 *
 * @class Tags
 * @extends {Component}
 */
class TagsRoute extends Component {
  tags: Array<Tag> = [];

  componentWillMount() {
    const { allMarkdownRemark } = this.props.data;
    const allTags = R.flatten(
      allMarkdownRemark.edges.map((edge) => edge.node.frontmatter.tags)
    );
    const allUniqTags = R.uniq(allTags);
    const tagCounts = R.countBy(t => R.toLower(t), allTags);

    this.tags = R.pipe(
      R.map(tag => ({
        name: tag,
        count: tagCounts[R.toLower(tag)],
      })),
      R.sort((tagA, tagB) => tagB.count - tagA.count)
    )(allUniqTags);
  }

  render() {
    const tags = this.tags.map(tag => tag.name);
    return (
      <PageWrapper>
        <NavBar />
        <PostContentWrapper>
          <Title>모든 태그</Title>
          <Tags tags={tags} fontSize="1rem" />
        </PostContentWrapper>
        <Footer />
      </PageWrapper>
    );
  }
}

export default TagsRoute;

export const tagsQuery = graphql`
  query TagQuery {
    allMarkdownRemark(
      limit: 2000
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`
