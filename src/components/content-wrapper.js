// @flow
import styled from 'styled-components';
import styles from "../styles";
import { rhythm } from '../utils/typography';

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 ${rhythm(1/2)};
  margin-top: ${styles.size.topNavHeight};

  ${styles.media.Desktop} {
    width: ${styles.size.mainWidthDesktop};
    margin-left: auto;
    margin-right: auto;
    padding: 0 ${rhythm(1)};
  }
`

export default ContentWrapper;