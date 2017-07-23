// @flow
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { clearFix } from 'polished';
import Link from 'gatsby-link';
import _ from 'lodash';
import { rhythm } from '../utils/typography';

const Wrapper = styled.div`
  margin-left: -0.3rem;
  ${clearFix()}
`;

const Tag = styled.span`
  font-family: 'Noto Sans Kr';
  font-weight: 100;
  display: block;
  float: left;
  padding: 4px 10px;
  margin-bottom: 4px;
  margin-left: 0.3rem;
  font-size: 0.8rem;
  line-height: ${rhythm(1)};
  color: rgba(0,0,0, 0.6);
  background-color: rgba(0,0,0, 0.04);
  border-radius: 3px;

  &:hover {
    background-color: rgba(0,0,0, 0.1);
  }
`;

/**
 * 태그 목록 컴포넌트. 태그 클릭시 해당 태그를 포함하고 있는 포스트 목록 페이지로 이동한다.
 *
 * @param {{ tags: Array<string> }} { tags }
 * @returns
 */
function Tags({ tags }: { tags: Array<string> }) {
  return (
    <Wrapper>
      {tags.map((tag: string) =>
        <Tag key={tag}>
          <Link to={`/tags/${_.kebabCase(tag)}`}>
            {tag}
          </Link>
        </Tag>
      )}
    </Wrapper>
  );
}

Tags.propTypes = {
  tags: PropTypes.array,
};

export default Tags;
