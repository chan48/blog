// @flow
import styled from 'styled-components'
import styles from '../styles'
import { rhythm } from '../utils/typography'

/**
 * 전체 페이지 박스
 */
export const PageWrapper = styled.main`
  position: relative;
  min-height: 100vh;
  padding-top: ${styles.sizes.topNavHeight};
  padding-bottom: ${styles.sizes.footerHeight};
`

/**
 * 페이지 컨텐츠
 */
export const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 ${rhythm(3 / 4)};
  margin-left: auto;
  margin-right: auto;

  ${styles.media.Desktop} {
    width: ${styles.sizes.mainWidthDesktop};
    padding: 0 ${rhythm(1)};
  }
`

/**
 * 포스트 컨텐츠
 */
export const PostContentWrapper = ContentWrapper.extend`
  margin-top: ${rhythm(2)};

  ${styles.media.Tablet} {
    width: ${styles.sizes.postWidth};
  }
`
