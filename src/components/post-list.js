// @flow
import Link from 'gatsby-link';
import React, { Component, PropTypes } from 'react';
import { rhythm, scale } from '../utils/typography';
import { wordWrap } from 'polished';
import styles from '../styles';
import styled from 'styled-components';
import moment from 'moment';

type Post = {
  node: {
    fields: {
      slug: string;
    },
    frontmatter: {
      date: string;
      title: string;
      mainImage: string;
    }
  }
};

const ListWrapper = styled.ul`
  width: 100%;
  margin: ${rhythm(2)} auto;
`

const PostCard = styled.li`
  display: block;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, .09);
  margin: ${rhythm(1.5)} 0;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

const MainImage = styled.div`
  display: block;
  width: 100%;
  height: ${rhythm(6)};
  margin: 0 auto;
  border-bottom: 1px solid rgba(0, 0, 0, .09);
  background-size: cover;
  background-position: 50% 0;
  background-repeat: no-repeat;

  ${styles.media.Phablet} {
    height: ${rhythm(8)};
  }
`

const PostInfo = styled.div`
  padding: ${rhythm(2/3)} ${rhythm(1)};
`

const PostTitle = styled.h2`
  font-weight: 100;
  margin: 0;
  font-size: 1.4rem;
  ${wordWrap('keep-all')}
  line-height: ${rhythm(1.4)};
`

const PostCreated = styled.time`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.44);
`

/**
 * 포스트 목록
 *
 * @class PostList
 * @extends {Component}
 */
class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array,
  };

  render() {
    const posts: Array<Post> = this.props.posts;

    return (
      <ListWrapper>
        {posts.map((post) => (
          <PostCard key={post.node.fields.slug}>
            <Link to={post.node.fields.slug}>
              {post.node.frontmatter.mainImage &&
                <MainImage
                  style={{
                    backgroundImage: `url(${post.node.frontmatter.mainImage})`
                  }}
                />
              }
              <PostInfo>
                <PostTitle>
                  {post.node.frontmatter.title}
                </PostTitle>
                <PostCreated>
                  {post.node.frontmatter.date}
                </PostCreated>
              </PostInfo>

            </Link>
          </PostCard>
        ))}
      </ListWrapper>
    )
  }
}

export default PostList;
