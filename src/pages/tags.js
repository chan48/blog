// @flow
import React, { Component } from 'react';
import R from 'ramda';
import Link from 'gatsby-link';
import _ from 'lodash'

export type Tag = {
  name: string,
  count: number,
};

/**
 * 모든 태그 목록
 *
 * @class Tags
 * @extends {Component}
 */
class Tags extends Component {
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
    return (
      <div>
        <h1>tags</h1>
        <ul>
          {this.tags.map(tag =>
            <li key={tag.name}>
              <Link to={`/tags/${_.kebabCase(tag.name)}/`}>{tag.name} {tag.count}</Link>
            </li>
          )}
        </ul>

      </div>
    );
  }
}

export default Tags;

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
