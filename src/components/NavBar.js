// @flow
import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { clearFix } from 'polished';
import styles from '../styles';
import ContentWrapper from '../components/content-wrapper'
import { rhythm } from '../utils/typography';

const TopNav = styled.nav`
  ${clearFix()}
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to right, #4568dc, #b06ab3);
  border-bottom: 1px solid ${styles.colors.border};
`

const NavInner = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  ${styles.media.Desktop} {
    width: ${styles.size.mainWidthDesktop};
  }
`;

const NavContentWrapper = ContentWrapper.extend`
  margin-top: 0;
`;

const SiteTitle = styled.div`
  float: left;
  margin: 0;
  color: #fff;
  font-weight: 100;
  font-size: 1.2rem;
  font-family: 'Noto Sans KR', 'PT Sans Narrow', sans-serif;
  line-height: ${styles.size.topNavHeight};
  letter-spacing: -1px;
`;

const MenuWrap = styled.ul`
  float: right;
  list-style: none;
  padding-left: 0;
  margin: 0;
`

const Menu = styled.li`
  font-size: 20px;
  line-height: ${styles.size.topNavHeight};
  color: #222;
  margin-bottom: 0;
  color: #fff;
  font-family: 'Noto Sans KR', 'PT Sans Narrow', sans-serif;
`

class NavBar extends React.Component {
  render() {
    return (
      <TopNav>
        <NavContentWrapper>
          <Link to={'/'}>
            <SiteTitle>rhostem.github.io</SiteTitle>
          </Link>
          <MenuWrap>
            <Link to={'/tags'}>
              <Menu>TAG</Menu>
            </Link>
          </MenuWrap>
        </NavContentWrapper>
      </TopNav>
    );
  }
}

NavBar.propTypes = {
};

export default NavBar;
