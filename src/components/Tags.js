// @flow
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { clearFix } from 'polished';
import Link from 'gatsby-link';
import _ from 'lodash';

const Wrapper = styled.span`
  ${clearFix()}
`;

const Tag = styled.span`
  float: left;
  display: block;
  padding: 4px 10px;
  margin-bottom: 4px;
  margin-left: 0.3rem;
  font-size: 0.8rem;
  color: rgba(0,0,0, 0.6);
  background-color: rgba(0,0,0, 0.04);
  border-radius: 3px;

  &:hover {
    background-color: rgba(0,0,0, 0.1);
  }

  &:not(:last-child) {
    margin-right: 4px;
  }
`;

/**
 * 태그 목록 컴포넌트. 태그 클릭시 해당 태그를 포함하고 있는 포스트 목록 페이지로 이동한다.
 *
 * @param {any} { tags }
 * @returns
 */

function Tags({ tags }: { tags: Array<string> }) {
  return (
    <Wrapper>
      {tags.map((tag: string) =>
        <Link to={`/tags/${_.kebabCase(tag)}`}>
          <Tag key={tag}>{tag}</Tag>
        </Link>
      )}
    </Wrapper>
  );
}

Tags.propTypes = {
  tags: PropTypes.array,
};

export default Tags;
