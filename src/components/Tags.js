// @flow
import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { clearFix } from 'polished'
import Link from 'gatsby-link'
import _ from 'lodash'
import { rhythm } from '../utils/typography'

const Wrapper = styled.div`
  margin-left: -0.3rem;
  ${clearFix()};
`

const Tag = styled.span`
  font-family: 'Roboto';
  font-size: ${props => (props.fontSize ? props.fontSize : '0.8rem')};
  font-weight: 100;
  display: block;
  float: left;
  padding: 0.25em 0.625em;
  margin-bottom: 0.35em;
  margin-left: 0.35em;
  line-height: ${rhythm(1)};
  color: rgba(0, 0, 0, 0.6);
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 3px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

type TagProps = {
  tags: Array<string>,
  fontSize?: string,
}

/**
 * 태그 목록 컴포넌트. 태그 클릭시 해당 태그를 포함하고 있는 포스트 목록 페이지로 이동한다.
 *
 * @param {{ tags: Array<string> }} { tags }
 * @returns
 */
function Tags({ tags, fontSize = '0.8rem' }: TagProps) {
  return (
    <Wrapper>
      {tags.map((tag: string) =>
        <Tag key={tag} fontSize={fontSize}>
          <Link to={`/tags/${_.kebabCase(tag)}`}>
            {tag}
          </Link>
        </Tag>,
      )}
    </Wrapper>
  )
}

Tags.propTypes = {
  tags: PropTypes.array,
  fontSize: PropTypes.string,
}

export default Tags
